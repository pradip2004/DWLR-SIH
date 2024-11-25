import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import connectDB from "./config/db";
import passport from "./config/passportConfig";
import session from "express-session";
import { initializeWebSocket } from "./config/websocket";
import { initializeKafkaProducer } from "./config/kafkaProducer";
import { consumeKafkaMessages } from "./config/kafkaConsumer";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
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


const websocketURL = "ws://localhost:3000";
initializeWebSocket(websocketURL);

initializeKafkaProducer();
consumeKafkaMessages();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


