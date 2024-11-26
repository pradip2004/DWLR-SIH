import { Kafka } from "kafkajs";
import { saveToMongoDB } from "../utils/mongoUtils";


const kafka = new Kafka({ brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "dwlr-consumer-group" });

export const consumeKafkaMessages = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "dwlr-data", fromBeginning: false });

    console.log("Kafka Consumer connected");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value?.toString() || "{}");
          console.log("Consumed message from Kafka:", data);

          // Store the message in MongoDB
          await saveToMongoDB(data);
        } catch (error) {
          console.error("Error consuming Kafka message:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error connecting Kafka Consumer:", error);
  }
};
