import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  state: String,
  district: String,
  waterLevel: Number,
  batteryPercentage: Number,
  timestamp: String,
});

export const DataModel = mongoose.model("WaterLevelData", dataSchema);