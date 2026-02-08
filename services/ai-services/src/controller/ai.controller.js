// Import the Groq service (rename your old service file or create new)
import { getCodeReview } from "../services/groq.services.js";

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Basic validation
    if (!code || !language) {
      return res.status(400).json({
        message: "Code and language are required"
      });
    }

    // Call Groq service
    const review = await getCodeReview(code, language);

    // Success response
    res.status(200).json({
      success: true,
      review: review
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);

    // Simple error response
    res.status(500).json({
      message: error.message || "AI Service Error"
    });
  }
};