import WebSocket from "ws";

interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  onMessage: (data: string) => void;
}

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private readonly url: string;
  private readonly reconnectInterval: number;
  private readonly onMessage: (data: string) => void;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isConnecting: boolean = false;

  constructor(config: WebSocketConfig) {
    this.url = config.url;
    this.reconnectInterval = config.reconnectInterval || 120000; // 2 minutes
    this.onMessage = config.onMessage;
  }

  public connect(): void {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      this.ws = new WebSocket(this.url);

      this.ws.on("open", () => {
        console.log("WebSocket connection established");
        this.isConnecting = false;
        this.scheduleNextConnection();
      });

      this.ws.on("message", (data: string) => {
        try {
          this.onMessage(data);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      });

      this.ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        this.handleDisconnection();
      });

      this.ws.on("close", () => {
        console.log("WebSocket connection closed");
        this.handleDisconnection();
      });

    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      this.handleDisconnection();
    }
  }

  private handleDisconnection(): void {
    this.isConnecting = false;
    if (this.ws) {
      try {
        this.ws.terminate();
      } catch (error) {
        console.error("Error terminating WebSocket:", error);
      }
      this.ws = null;
    }
    this.scheduleNextConnection();
  }

  private scheduleNextConnection(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      console.log("Attempting to reconnect WebSocket...");
      this.connect();
    }, this.reconnectInterval);
  }

  public close(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.terminate();
    }
  }
}

// Updated setupWebSocket function
export const setupWebSocket = (onMessage: (data: string) => void) => {
  const wsManager = new WebSocketManager({
    url: "ws://localhost:3000",
    reconnectInterval: 120000, // 2 minutes
    onMessage: onMessage
  });

  wsManager.connect();

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('Closing WebSocket connection...');
    wsManager.close();
    process.exit();
  });

  return wsManager;
};




// import WebSocket from "ws";

// const wsUrl = "ws://localhost:3000";

// export const setupWebSocket = (onMessage: (data: string) => void) => {
//   const connectWebSocket = () => {
//     const ws = new WebSocket(wsUrl);

//     ws.on("open", () => {
//       console.log("WebSocket connection established.");
//     });

//     ws.on("message", (data: string) => {
     
//       onMessage(data);
//     });

    

//     ws.on("error", (err) => {
//       console.error("WebSocket error:", err);
//     });

    
//   };

//   // Initial connection
//   connectWebSocket();
// };







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
