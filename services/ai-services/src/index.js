import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

// Load environment variables FIRST
dotenv.config();

// Verify environment variables
console.log("=".repeat(50));
console.log("🔧 ENVIRONMENT CHECK:");
console.log("=".repeat(50));
console.log("PORT:", process.env.PORT);
console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
console.log("GROQ_API_KEY starts with:", process.env.GROQ_API_KEY?.substring(0, 10) || "NOT FOUND");
console.log("Node Environment:", process.env.NODE_ENV || "development");
console.log("=".repeat(50));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "running",
    service: "AI Code Review API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      review: "POST /api/ai/review",
      docs: "Coming soon"
    }
  });
});

// API Routes
app.use("/", aiRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Global Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { error: err.message })
  });
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`\n🚀 Server started successfully!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}`);
  console.log(`📝 Review API: http://localhost:${PORT}/api/ai/review`);
  console.log(`🌐 Health: http://localhost:${PORT}/`);
  console.log("\n📋 Waiting for requests...\n");
});