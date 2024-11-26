import { Producer } from "kafka-node";
import { kafkaClient } from "./kafka";

const topic = "dwlr-test";

export const kafkaProducer = new Producer(kafkaClient);

kafkaProducer.on("ready", () => {
  console.log("Kafka Producer is ready.");
});

kafkaProducer.on("error", (err) => {
  console.error("Kafka Producer error:", err);
});

export const sendToKafka = (message: any) => {
  const payloads = [{ topic, messages: JSON.stringify(message) }];
  kafkaProducer.send(payloads, (err, data) => {
    if (err) {
      console.error("Error sending data to Kafka:", err);
    } else {
      console.log("Data sent to Kafka:", data);
    }
  });
};
