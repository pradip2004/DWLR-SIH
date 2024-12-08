
import { Consumer, Message } from "kafka-node";
import { kafkaClient } from "./kafka";
import { DWLR } from "../model/dwlr";
import { DailyDWLRData } from "../model/dwlrData";
import mongoose from "mongoose";

const topic = process.env.KAFKA_TOPIC || "dwlr-test";

// Check MongoDB connection status
console.log("MongoDB connection state:", mongoose.connection.readyState);

// Create the Kafka consumer
export const kafkaConsumer = new Consumer(kafkaClient, [{ topic, partition: 0 }], {
  autoCommit: true,
});

console.log("Kafka consumer created. Listening for messages...");

kafkaConsumer.on("message", async (message: Message) => {
  console.log("Kafka message received:", message);

  try {
    // Step 1: Parse message value
    if (!message.value) {
      console.error("Message has no value:", message);
      return;
    }

    const dwlrData = JSON.parse(message.value as string);
    console.log("Parsed Kafka message value:", dwlrData);

    // Step 2: Validate required fields
    if (!dwlrData.id) {
      console.error("DWLR data missing 'id':", dwlrData);
      return;
    }

    // Step 3: Find DWLR in MongoDB
    const dwlr = await DWLR.findOne({ id: dwlrData.id }).select("_id lowBattery active");
    if (!dwlr) {
      console.error(`DWLR with id ${dwlrData.id} not found in MongoDB.`);
      return;
    }

    // Step 4: Check battery level and update `lowBattery` and `active` fields
    const batteryPercentage = dwlrData.batteryPercentage ? parseFloat(dwlrData.batteryPercentage) : undefined;
    let updated = false;

    if (batteryPercentage !== undefined && batteryPercentage < 85) {
      if (!dwlr.lowBattery || dwlr.active) {
        console.log(`Battery level for DWLR ID ${dwlrData.id} is below 85%. Updating lowBattery to true and active to false.`);
        dwlr.lowBattery = true;
        dwlr.active = false;
        updated = true;
      }
    } else if (dwlr.lowBattery || !dwlr.active) {
      console.log(`Battery level for DWLR ID ${dwlrData.id} is above or equal to 85%. Updating lowBattery to false and active to true.`);
      dwlr.lowBattery = false;
      dwlr.active = true;
      updated = true;
    }

    if (updated) {
      await dwlr.save();
      console.log(`Updated DWLR ID ${dwlrData.id}: lowBattery=${dwlr.lowBattery}, active=${dwlr.active}.`);
    }

    // Step 5: Prepare data for DailyDWLRData
    const today = new Date();
    const dateString = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const dataPoint = {
      waterLevel: dwlrData.waterLevel ? parseFloat(dwlrData.waterLevel) : null,
      batteryPercentage: batteryPercentage,
      timestamp: dwlrData.timestamp ? new Date(dwlrData.timestamp) : new Date(),
      temperature: dwlrData.temperature ? parseFloat(dwlrData.temperature) : undefined,
    };

    console.log("Data prepared for DailyDWLRData:", dataPoint);

    // Step 6: Save data to DailyDWLRData
    const dailyData = await DailyDWLRData.findOneAndUpdate(
      { dwlrId: dwlr._id, date: dateString },
      { $push: { dailyData: dataPoint } },
      { upsert: true, new: true }
    );

    console.log("Data successfully saved to DailyDWLRData:", dailyData);
  } catch (err) {
    console.error("Error while processing Kafka message:", err);
  }
});

// Error handling
kafkaConsumer.on("error", (err: Error) => {
  console.error("Kafka Consumer error:", err);
});

// Offset out-of-range handling
kafkaConsumer.on("offsetOutOfRange", (err) => {
  console.error("Kafka Consumer offset out of range error:", err);
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("Shutting down...");
  kafkaConsumer.close(true, () => {
    console.log("Kafka consumer closed.");
    process.exit(0);
  });
});
