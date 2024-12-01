import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import dwlrRoutes from "./routes/dwlrRoutes"
import connectDB from "./config/db";
import passport from "./config/passportConfig";
import session from "express-session";
import cors from 'cors';
import { setupWebSocket } from "./config/websocket";
import { sendToKafka } from "./config/kafkaProducer";
import './config/kafkaConsumer';


dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true,  
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to DWLRs Nirikshak Backend!");
});

app.use("/api/auth", authRoutes);
app.use("/api/v1/dwlr", dwlrRoutes);
// app.use("/api/v2/dwlr", )



// setupWebSocket((data: string) => {
//   console.log("WebSocket received new data at:", new Date().toISOString());
//   console.log("Raw data received:", data);
//   try {
//     const dwlrArray = JSON.parse(data);
//     if (Array.isArray(dwlrArray)) {
//       dwlrArray.forEach((dwlr) => {
//         sendToKafka(dwlr);
//       });
//     }
//   } catch (err) {
//     console.error("Error processing WebSocket message:", err);
//   }
// });


const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


