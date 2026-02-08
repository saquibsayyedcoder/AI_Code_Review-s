import prisma from "../config/prisma.js";
import { getAIReview } from "../services/aiClient.js";

export const createReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: "Code and language required" });
    }

    const userId = req.user.id;

    // Call AI service
    const aiResponse = await getAIReview(code, language);

    const review = await prisma.review.create({
      data: {
        userId,
        code,
        language,
        aiFeedback: aiResponse.feedback,
        score: aiResponse.score,
      },
    });

    res.status(201).json(review);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create review" });
  }
};
