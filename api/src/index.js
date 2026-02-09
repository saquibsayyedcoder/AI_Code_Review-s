import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();


// ✅ CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

// AUTH SERVICE
// AUTH SERVICE
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth-services:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
  })
);

// REVIEW SERVICE
app.use(
  "/api/review",
  createProxyMiddleware({
    target: "http://review-services:5002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/review": "",
    },
  })
);

// AI SERVICE
app.use(
  "/api/ai",
  createProxyMiddleware({
    target: "http://ai-services:5004",
    changeOrigin: true,
    pathRewrite: {
      "^/api/ai": "",
    },
  })
);




app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running 🚀"
  });
});



app.listen(5000, () => {
  console.log("🚀 Gateway running on 5000");
});
