import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFileSync(path.join(logsDir, "server.log"), logMessage);
  console.log(logMessage.trim());
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Shop4Pi backend running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
