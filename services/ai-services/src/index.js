import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5004;
console.log("ENV KEY CHECK:", process.env.GEMINI_API_KEY);

app.listen(PORT, () => {
  console.log(`AI Services running on port ${PORT}`);
});