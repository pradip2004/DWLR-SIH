import { Consumer } from "kafka-node";
import { kafkaClient } from "./kafka";
import { DWLR } from "../model/dwlr";


const topic = process.env.KAFKA_TOPIC || "dwlr-test";

export const kafkaConsumer = new Consumer(kafkaClient, [{ topic, partition: 0 }], {
  autoCommit: true,
});

kafkaConsumer.on("message", async (message) => {
  try {
    const dwlrData = JSON.parse(message.value as string);
    console.log("Received data from Kafka:", dwlrData);

    const dwlr = new DWLR(dwlrData);
    await dwlr.save();
    console.log("Data saved to MongoDB:", dwlrData);
  } catch (err) {
    console.error("Error saving data to MongoDB:", err);
  }
});

kafkaConsumer.on("error", (err) => {
  console.error("Kafka Consumer error:", err);
});
