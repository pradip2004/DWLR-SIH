import WebSocket from "ws";
import { sendToKafka } from "./kafkaProducer";


export const initializeWebSocket = (url: string) => {
  const ws = new WebSocket(url);

  ws.on("open", () => {
    console.log("Connected to WebSocket server");
  });

  ws.on("message", async (data) => {
    try {
      const parsedData = JSON.parse(data.toString());

      // Send data to Kafka
      await sendToKafka(parsedData);

      console.log("Published data to Kafka:", parsedData);
    } catch (error) {
      console.error("Error handling WebSocket data:", error);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  return ws;
};
