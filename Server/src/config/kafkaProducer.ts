import { Kafka } from "kafkajs";

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();

export const initializeKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected");
  } catch (error) {
    console.error("Error connecting Kafka Producer:", error);
  }
};

export const sendToKafka = async (data: any) => {
  try {
    await producer.send({
      topic: "dwlr-data",
      messages: [{ value: JSON.stringify(data) }],
    });
  } catch (error) {
    console.error("Error sending data to Kafka:", error);
  }
};
