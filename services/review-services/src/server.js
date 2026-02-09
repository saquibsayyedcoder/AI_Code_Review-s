import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/review.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Review Service Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Review service running on port ${process.env.PORT}`);
});
