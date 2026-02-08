import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: false
});

// CURRENT WORKING MODELS (Feb 2025)
// Based on deprecation docs: https://console.groq.com/docs/deprecations
const AVAILABLE_MODELS = [
  "llama-3.3-70b-versatile",      // ✅ Best for code review (replaces llama3-70b-8192)
  "llama-3.1-8b-instant",         // ✅ Fast & efficient (replaces llama3-8b-8192)
  "qwen/qwen3-32b",               // ✅ Good for coding tasks
  "meta-llama/llama-4-maverick-17b-128e-instruct", // ✅ Specifically for coding
  "meta-llama/llama-4-scout-17b-16e-instruct",     // ✅ Alternative
  "openai/gpt-oss-120b",          // ✅ Powerful but may be slower
];

/**
 * Get code review using Groq
 */
export const getCodeReview = async (code, language) => {
  let lastError = null;
  
  console.log(`📝 Requesting code review for ${language} (${code.length} chars)`);
  
  // Try each model until one works
  for (const modelName of AVAILABLE_MODELS) {
    try {
      console.log(`🔄 Attempting with model: ${modelName}`);
      
      const prompt = `You are an expert ${language} code reviewer with 10+ years experience.

CODE TO REVIEW:
\`\`\`${language}
${code}
\`\`\`

**Provide a comprehensive code review with these sections:**

1. **CODE QUALITY**
   - Readability and clarity
   - Code structure and organization
   - Naming conventions

2. **BEST PRACTICES**
   - ${language} best practices compliance
   - Potential anti-patterns
   - Style guide violations

3. **PERFORMANCE**
   - Time and space complexity analysis
   - Optimization opportunities
   - Memory usage concerns

4. **SECURITY**
   - Potential vulnerabilities
   - Input validation issues
   - Data safety concerns

5. **BUGS & EDGE CASES**
   - Logical errors
   - Boundary conditions
   - Error handling

6. **RECOMMENDATIONS**
   - Specific improvements
   - Refactored code examples
   - Alternative approaches

Be specific, technical, and provide actionable feedback.`;

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a senior software engineer specializing in code reviews. Provide detailed, actionable feedback in markdown format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: modelName,
        temperature: 0.3, // Lower = more focused on code review
        max_tokens: 2048,
        top_p: 0.95,
        stream: false
      });

      const review = completion.choices[0]?.message?.content;
      
      if (!review || review.trim().length === 0) {
        console.log(`⚠️  Empty response from ${modelName}, trying next model...`);
        continue;
      }

      console.log(`✅ Success with model: ${modelName}`);
      console.log(`📊 Review length: ${review.length} characters`);
      
      return review;
      
    } catch (error) {
      lastError = error;
      console.log(`❌ ${modelName} failed: ${error.message.split('.')[0]}`);
      // Continue to next model
    }
  }
  
  // If all models fail
  const errorMsg = lastError?.message || "All models failed";
  console.error("💥 All model attempts failed:", errorMsg);
  throw new Error(`AI Service Error: ${errorMsg}`);
};

/**
 * Test API connectivity with CURRENT models
 */
export const testGroqConnection = async () => {
  try {
    console.log("🧪 Testing Groq API with current models...");
    
    if (!process.env.GROQ_API_KEY) {
      return {
        success: false,
        error: "GROQ_API_KEY not found in .env file"
      };
    }
    
    // Try with the most reliable current model first
    const testModels = [
      "llama-3.1-8b-instant",  // Fast and reliable
      "llama-3.3-70b-versatile", // Powerful
      "qwen/qwen3-32b",       // Good alternative
    ];
    
    for (const modelName of testModels) {
      try {
        console.log(`Testing model: ${modelName}`);
        
        const completion = await groq.chat.completions.create({
          messages: [
            { 
              role: "user", 
              content: "Say 'API is working' and nothing else" 
            }
          ],
          model: modelName,
          max_tokens: 10,
          temperature: 0.1
        });
        
        const response = completion.choices[0]?.message?.content;
        
        console.log(`✅ ${modelName}: ${response}`);
        
        return {
          success: true,
          response: response,
          model: modelName,
          message: `Groq API is working with ${modelName}`
        };
        
      } catch (error) {
        console.log(`❌ ${modelName}: ${error.message.split('.')[0]}`);
        continue;
      }
    }
    
    // If all test models failed
    return {
      success: false,
      error: "All tested models failed. Check deprecation page.",
      message: "Failed to connect to any Groq model"
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Failed to connect to Groq API"
    };
  }
};

/**
 * Get list of currently available models
 */
export const getAvailableModels = () => {
  return AVAILABLE_MODELS;
};