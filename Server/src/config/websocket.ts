import WebSocket from "ws";

const wsUrl = "ws://localhost:3000";

export const setupWebSocket = (onMessage: (data: string) => void) => {
  const connectWebSocket = () => {
    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
      console.log("WebSocket connection established.");
    });

    ws.on("message", (data: string) => {
     
      onMessage(data);
    });

    

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });

    
  };

  // Initial connection
  connectWebSocket();
};







// import WebSocket from "ws";

// const wsUrl = "ws://localhost:3000";

// export const setupWebSocket = (onMessage: (data: string) => void) => {
//   const ws = new WebSocket(wsUrl);

//   ws.on("open", () => {
//     console.log("WebSocket connection established.");
//   });

//   ws.on("message", (data: string) => {
//     onMessage(data);
//   });

//   ws.on("close", () => {
//     console.log("WebSocket connection closed. Reconnecting...");
//     setTimeout(setupWebSocket, 5000); 
//   });

//   ws.on("error", (err) => {
//     console.error("WebSocket error:", err);
//   });

//   return ws;
// };
