from flask import Flask, request, jsonify
from pymongo import MongoClient
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)


app = Flask(__name__)


model = joblib.load("./DWLR Battery Prediction/battery_prediction_model.pkl")
scaler = StandardScaler() 

@app.route('/predict', methods=['POST'])
def predict():
    try:
       
        data = request.get_json()

        
        if not all(key in data for key in ["Battery Level", "Days", "Temperature"]):
            return jsonify({"error": "Invalid input format. Required keys: 'Battery Level', 'Days', 'Temperature'"}), 400
        
        
        features = [
            data["Battery Level"],
            data["Days"],
            data["Temperature"]
        ]

        
        features_scaled = scaler.fit_transform([features])  

        
        prediction = model.predict(features_scaled)[0]

        
        return jsonify({"Days Remaining": round(prediction, 2)})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

