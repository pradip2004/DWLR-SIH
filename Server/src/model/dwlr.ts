import mongoose from "mongoose";

const dwlrSchema = new mongoose.Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  state: String,
  district: String,
  waterLevel: Number,
  batteryPercentage: Number,
  timestamp: String,
});

export const DWLR = mongoose.model("DWLR", dwlrSchema);
