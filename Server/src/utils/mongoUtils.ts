import { DataModel } from "../model/DwlrData";

export const saveToMongoDB = async (data: any) => {
      try {
        const newData = new DataModel(data);
        await newData.save();
        console.log("Stored data in MongoDB:", data);
      } catch (error) {
        console.error("Error saving data to MongoDB:", error);
      }
    };