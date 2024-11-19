import express, { Request, Response } from "express"

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to DWLRs Nirikshak Backend!");
});

app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});