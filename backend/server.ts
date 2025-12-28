import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Shop4Pi backend running ✅");
});

const PORT = process.env.PORT || 3314;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
