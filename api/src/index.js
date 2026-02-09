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
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "", // remove /api/auth before forwarding
    },
    logLevel: "debug",     // optional, helps debug
    proxyTimeout: 10000,   // optional, 10s for testing
  })
);



// REVIEW SERVICE
app.use(
  "/api/review",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
  })
);

// API Gateway (index.js)
// Corrected version
app.use(
  "/api/ai",
  createProxyMiddleware({
    target: "http://localhost:5004", // AI service port
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: { "^/api/ai": "" }, // <-- removes /api/ai prefix before forwarding
  })
);






app.listen(5000, () => {
  console.log("🚀 Gateway running on 5000");
});
