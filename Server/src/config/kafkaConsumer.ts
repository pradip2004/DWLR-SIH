import { Consumer } from "kafka-node";
import { kafkaClient } from "./kafka";
import { DWLR } from "../model/dwlr"; 
import { DailyDWLRData } from "../model/dwlrData";


const topic = process.env.KAFKA_TOPIC || "dwlr-test";

export const kafkaConsumer = new Consumer(kafkaClient, [{ topic, partition: 1 }], {
  autoCommit: true,
});

kafkaConsumer.on("message", async (message) => {
  try {
    const dwlrData = JSON.parse(message.value as string);
    console.log("Received data from Kafka:", dwlrData);

    
    const dwlr = await DWLR.findOne({ id: dwlrData.id }).select("_id");
    if (!dwlr) {
      console.error(`DWLR with id ${dwlrData.id} not found.`);
      return;
    }

    // Step 2: Determine today's date
    const today = new Date();
    const dateString = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Step 3: Find or create the daily data document
    const dailyData = await DailyDWLRData.findOneAndUpdate(
      { dwlrId: dwlr._id, date: dateString },
      {
        $push: {
          dailyData: {
            waterLevel: parseFloat(dwlrData.waterLevel),
            batteryPercentage: parseFloat(dwlrData.batteryPercentage),
            timestamp: new Date(dwlrData.timestamp),
            temperature: parseFloat(dwlrData.temperature),
          },
        },
      },
      { upsert: true, new: true }
    );

    console.log("Data saved or updated in DailyDWLRData:", dailyData);
  } catch (err) {
    console.error("Error saving data to MongoDB:", err);
  }
});

kafkaConsumer.on("error", (err) => {
  console.error("Kafka Consumer error:", err);
});
