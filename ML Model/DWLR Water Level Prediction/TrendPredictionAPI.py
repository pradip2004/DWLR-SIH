from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from xgboost import XGBRegressor
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Initialize MongoDB connection
client = MongoClient(MONGO_URI)
db = client["water_level_db"]
collection = db["water_level_data"]

# Initialize the model and scaler globally
model = XGBRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=6,
    min_child_weight=2,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    enable_categorical=True  # Enable categorical feature support
)

scaler = MinMaxScaler()

def add_lag_features(df, target, lags):
    for lag in range(1, lags + 1):
        df[f"{target}_lag_{lag}"] = df.groupby('dwlr_id')[target].shift(lag)
    return df

def create_features(df):
    df = add_lag_features(df, "water_level", lags=10)
    df = add_lag_features(df, "temperature", lags=5)
    df = add_lag_features(df, "rainfall", lags=7)
    
    windows = [7, 14, 30]
    for window in windows:
        df[f'water_level_rolling_mean_{window}d'] = df.groupby('dwlr_id')['water_level'].transform(
            lambda x: x.rolling(window=window).mean())
        df[f'rainfall_rolling_sum_{window}d'] = df.groupby('dwlr_id')['rainfall'].transform(
            lambda x: x.rolling(window=window).sum())
        df[f'temp_rolling_mean_{window}d'] = df.groupby('dwlr_id')['temperature'].transform(
            lambda x: x.rolling(window=window).mean())
    
    df['rainfall_temp_interaction'] = df['rainfall'] * df['temperature']
    df['dry_condition'] = ((df['temperature'] > df['temperature'].mean()) & 
                          (df['rainfall'] < df['rainfall'].mean())).astype(int)
    
    df['month'] = df.index.month
    
    # Instead of using get_dummies, we'll use a simpler numerical approach for seasons
    df['season'] = pd.cut(df.index.month, 
                         bins=[0,3,6,9,12], 
                         labels=[0,1,2,3]).astype(int)  # Convert seasons to integers
    
    return df

def remove_outliers_iqr(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]

def prepare_future_data(latest_data, days=10):
    future_dates = [latest_data.index[-1] + timedelta(days=i+1) for i in range(days)]
    future_df = pd.DataFrame(index=future_dates)
    future_df['dwlr_id'] = latest_data['dwlr_id'].iloc[-1]
    
    # Use moving averages for future temperature and rainfall
    future_df['temperature'] = latest_data['temperature'].rolling(window=7).mean().iloc[-1]
    future_df['rainfall'] = latest_data['rainfall'].rolling(window=7).mean().iloc[-1]
    
    return future_df

def train_model(dwlr_id):
    # Fetch historical data
    cursor = collection.find({"dwlr_id": dwlr_id})
    data = pd.DataFrame(list(cursor))
    
    if len(data) == 0:
        raise ValueError(f"No data found for DWLR ID: {dwlr_id}")
    
    # Prepare the data
    data["date"] = pd.to_datetime(data["date"])
    data.set_index("date", inplace=True)
    data = data.sort_index()
    
    # Handle missing values and outliers
    data.interpolate(method='time', limit_direction='both', inplace=True)
    data = remove_outliers_iqr(data, "water_level")
    
    # Scale the features
    global scaler
    data[["water_level", "temperature", "rainfall"]] = scaler.fit_transform(
        data[["water_level", "temperature", "rainfall"]])
    
    # Create features and prepare for training
    data = create_features(data)
    data.dropna(inplace=True)
    
    X = data.drop(columns=["_id", "dwlr_id", "state", "district", "water_level", "battery_percentage"])
    y = data["water_level"]
    
    # Train the model
    global model
    model.fit(X, y)
    
    return data

@app.route('/predict/<dwlr_id>', methods=['GET'])
def predict_water_level(dwlr_id):
    try:
        # Train model with historical data
        latest_data = train_model(dwlr_id)
        
        # Prepare future data for prediction
        future_data = prepare_future_data(latest_data)
        future_data = create_features(pd.concat([latest_data, future_data]))
        future_data = future_data.tail(10)  # Get only the future dates
        
        # Make predictions
        X_future = future_data.drop(columns=["_id", "dwlr_id", "state", "district", 
                                           "water_level", "battery_percentage"], errors='ignore')
        predictions = model.predict(X_future)
        
        # Inverse transform predictions
        predictions = scaler.inverse_transform(
            np.column_stack([predictions, 
                           np.zeros_like(predictions), 
                           np.zeros_like(predictions)])
        )[:, 0]
        
        # Format response
        response_data = {
            "data": [
                {
                    "date": date.strftime("%Y-%m-%d"),
                    "waterLevel": round(float(level), 2)
                }
                for date, level in zip(future_data.index, predictions)
            ]
        }
        
        return jsonify(response_data)
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)