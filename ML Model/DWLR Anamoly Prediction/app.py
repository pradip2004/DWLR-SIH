from flask import Flask, request, jsonify
import numpy as np
import pickle
from tensorflow.keras.models import load_model

app = Flask(__name__)

def load_models_info():
    with open('models/models_info.pkl', 'rb') as f:
        return pickle.load(f)

def check_anomaly(input_water_level, rolling_mean, rolling_std, threshold_factor=2):
    lower_threshold = rolling_mean - threshold_factor * rolling_std
    upper_threshold = rolling_mean + threshold_factor * rolling_std
    return "Anomaly" if input_water_level < lower_threshold or input_water_level > upper_threshold else "Normal"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        dwlr_id = data['dwlr_id']
        input_water_level = float(data['water_level'])
        input_temperature = float(data['temperature'])
        input_rainfall = float(data['rainfall'])
        
        # Load model info
        models_info = load_models_info()
        if dwlr_id not in models_info:
            return jsonify({'error': f'DWLR ID {dwlr_id} not found'}), 404
        
        model_info = models_info[dwlr_id]
        
        # Load model and scalers
        model = load_model(model_info['model_path'])
        with open(model_info['scalers_path'], 'rb') as f:
            scalers = pickle.load(f)
        
        # Scale input features
        scaled_water_level = scalers['water_level'].transform([[input_water_level]])[0][0]
        scaled_temperature = scalers['temperature'].transform([[input_temperature]])[0][0]
        scaled_rainfall = scalers['rainfall'].transform([[input_rainfall]])[0][0]
        
        # Prepare input sequence
        input_sequence = np.array([[scaled_water_level, scaled_temperature, scaled_rainfall]] * model_info['window_size'])
        input_sequence = input_sequence.reshape(1, model_info['window_size'], 3)
        
        # Make prediction
        predicted_scaled = model.predict(input_sequence)
        predicted_water_level = scalers['water_level'].inverse_transform(predicted_scaled)[0][0]
        
        # Check anomaly
        anomaly_status = check_anomaly(
            input_water_level,
            model_info['rolling_mean'],
            model_info['rolling_std']
        )
        
        return jsonify({
            'predicted_water_level': float(predicted_water_level),
            'input_water_level': input_water_level,
            'status': anomaly_status
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)