import mongoose from "mongoose";

const dailyDataSchema = new mongoose.Schema({
      dwlrId: { type: mongoose.Schema.Types.ObjectId, ref: "DWLR", required: true }, // Reference to DWLR
      dailyData: [
            {
                  waterLevel: Number,
                  batteryPercentage: Number,
                  timestamp: { type: Date, required: true },
                  temperature: Number
            }
      ],
      date: { type: Date, required: true }
});


export const DailyDWLRData = mongoose.model("DailyDWLRData", dailyDataSchema);