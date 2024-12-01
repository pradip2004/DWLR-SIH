import mongoose, { Schema, Document, Model } from "mongoose";
import { updateDWLRStatusOnSave } from "../middlewares/updateDWLRStatus";

// Define the structure of the `dailyData` array
export interface DailyDataItem {
  waterLevel?: number;
  batteryPercentage?: number;
  timestamp: Date;
  temperature?: number;
}

// Define the full structure of the `DailyDWLRData` document
export interface DailyDWLRDataDocument extends Document {
  dwlrId: mongoose.Types.ObjectId;
  dailyData: DailyDataItem[];
  date: Date;
}

// Define the Mongoose schema
const dailyDataSchema = new mongoose.Schema<DailyDWLRDataDocument>({
  dwlrId: { type: mongoose.Schema.Types.ObjectId, ref: "DWLR", required: true },
  dailyData: [
    {
      waterLevel: { type: Number },
      batteryPercentage: { type: Number },
      timestamp: { type: Date, required: true },
      temperature: { type: Number },
    },
  ],
  date: { type: Date, required: true },
});

dailyDataSchema.post("save", async function (doc: DailyDWLRDataDocument) {
      await updateDWLRStatusOnSave(doc);
    });
// Create and export the model with proper typing
export const DailyDWLRData: Model<DailyDWLRDataDocument> = mongoose.model<DailyDWLRDataDocument>(
  "DailyDWLRData",
  dailyDataSchema
);
