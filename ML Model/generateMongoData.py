from pymongo import MongoClient
import random
import datetime
import numpy as np


client = MongoClient("")  
db = client["water_level_db"]  
collection = db["water_level_data"]  


states_and_districts = [
    {"state": "Maharashtra", "district": "Mumbai"},
    {"state": "Karnataka", "district": "Bangalore"},
    {"state": "Tamil Nadu", "district": "Chennai"},
    {"state": "Uttar Pradesh", "district": "Lucknow"},
    {"state": "West Bengal", "district": "Kolkata"},
]

# Parameters
num_dwlrs = 50
records_per_dwlr = 500

# Generate DWLR IDs
dwlrs = [f"DWLR_{i+1:03}" for i in range(num_dwlrs)]

# Generate data
documents = []
np.random.seed(42)

for dwlr_id in dwlrs:
    # Randomly assign a state and district
    location = random.choice(states_and_districts)
    state = location["state"]
    district = location["district"]
    
    for i in range(records_per_dwlr):
        date = datetime.datetime.now() - datetime.timedelta(days=i)
        water_level = round(np.random.uniform(1, 10), 2)  
        temperature = round(np.random.uniform(10, 45), 2)  
        rainfall = round(np.random.uniform(0, 50), 2) 
        
        # Create document
        document = {
            "dwlr_id": dwlr_id,
            "state": state,
            "district": district,
            "date": date,
            "water_level": water_level,
            "temperature": temperature,
            "rainfall": rainfall
        }
        documents.append(document)

# Insert data into MongoDB
collection.insert_many(documents)

print("Data insertion complete!")
