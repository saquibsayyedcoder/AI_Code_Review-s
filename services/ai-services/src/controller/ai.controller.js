import { generateReview } from "../services/llm.services.js"

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        message: "Code and language are required"
      });
    }

    const review = await generateReview(code, language);

    res.status(200).json({
      success: true,
      review
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      message: "AI Service Error"
    });
  }
};
