import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logging

// ==========================
// AUTH SERVICE
// ==========================
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "/api/auth",
    },
  })
);

// ==========================
// REVIEW SERVICE
// ==========================
app.use(
  "/api/review",
  createProxyMiddleware({
    target: process.env.REVIEW_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/review": "/api/review",
    },
  })
);

// ==========================
// AI SERVICE (optional)
// ==========================
app.use(
  "/api/ai",
  createProxyMiddleware({
    target: process.env.AI_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/ai": "/api/ai",
    },
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "API Gateway Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
