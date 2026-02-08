// test-api.js
import { testGroqConnection } from "./src/services/groq.services.js";
import fetch from "node-fetch";

async function comprehensiveTest() {
  console.log("=".repeat(60));
  console.log("🧪 COMPREHENSIVE GROQ API TEST");
  console.log("=".repeat(60));
  
  // Test 1: API Connection
  console.log("\n1. Testing API connectivity...");
  const apiTest = await testGroqConnection();
  
  if (!apiTest.success) {
    console.log("❌ API Test Failed:", apiTest.error);
    console.log("\n💡 Visit: https://console.groq.com/docs/deprecations");
    return;
  }
  
  console.log(`✅ API Working with model: ${apiTest.model}`);
  console.log(`Response: ${apiTest.response}`);
  
  // Test 2: Server endpoint
  console.log("\n2. Testing server endpoint...");
  try {
    const serverResponse = await fetch("http://localhost:5004/");
    const serverData = await serverResponse.json();
    console.log("✅ Server is running");
    console.log("Server status:", serverData.status);
  } catch (error) {
    console.log("❌ Server not reachable:", error.message);
    console.log("💡 Start server with: npm start");
  }
  
  // Test 3: Review endpoint
  console.log("\n3. Testing review endpoint...");
  const testCode = `function calculateSum(numbers) {
  let result = 0;
  for(let i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }
  return result;
}`;
  
  try {
    const reviewResponse = await fetch("http://localhost:5004/api/ai/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: testCode,
        language: "javascript"
      })
    });
    
    const reviewData = await reviewResponse.json();
    
    if (reviewResponse.ok) {
      console.log("✅ Review endpoint working!");
      console.log(`Model used: ${reviewData.model || "Unknown"}`);
      console.log(`Review length: ${reviewData.review?.length || 0} chars`);
      console.log("\n📋 Sample (first 150 chars):");
      console.log("-".repeat(40));
      console.log(reviewData.review?.substring(0, 150) + "...");
      console.log("-".repeat(40));
    } else {
      console.log("❌ Review endpoint error:", reviewData.message);
    }
    
  } catch (error) {
    console.log("❌ Review endpoint failed:", error.message);
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("🎯 RECOMMENDED MODELS (Feb 2025):");
  console.log("=".repeat(60));
  console.log("1. llama-3.3-70b-versatile");
  console.log("2. llama-3.1-8b-instant"); 
  console.log("3. qwen/qwen3-32b");
  console.log("4. meta-llama/llama-4-maverick-17b-128e-instruct");
  console.log("=".repeat(60));
}

// Run test
comprehensiveTest();