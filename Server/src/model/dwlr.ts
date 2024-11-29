import mongoose from "mongoose";

const dwlrSchema = new mongoose.Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  state: String,
  district: String,
  lowBattery: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  anomalyDwlr: {
    type: Boolean,
    default: false,
  }
});

export const DWLR = mongoose.model("DWLR", dwlrSchema);
