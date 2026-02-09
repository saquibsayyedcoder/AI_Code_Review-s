import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log("AUTH SERVICE HIT:", req.method, req.url);
  next();
});

app.use("/", authRoutes);


app.get("/", (req, res) => {
  res.send("Auth Service Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Auth service running on port ${process.env.PORT}`);
});
