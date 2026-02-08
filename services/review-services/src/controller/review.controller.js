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

    const feedback = aiResponse.feedback;
    const score = aiResponse.score;

    const review = await prisma.review.create({
      data: {
        userId,
        code,
        language,
        aiFeedback: feedback,
        score: score,
      },
    });

    res.status(201).json({ success: true, review });

  } catch (error) {
    console.error("Failed to create review:", error);
    res.status(500).json({ message: "Failed to create review" });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Basic stats
    const stats = await prisma.review.aggregate({
      where: { userId },
      _count: true,
      _avg: { score: true },
      _max: { score: true },
      _min: { score: true },
    });

    // Language-wise breakdown
    const languageStats = await prisma.review.groupBy({
      by: ["language"],
      where: { userId },
      _count: true,
      _avg: { score: true },
    });

    // Latest 5 reviews
    const latestReviews = await prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    res.status(200).json({
      success: true,
      analytics: {
        totalReviews: stats._count,
        averageScore: stats._avg.score || 0,
        highestScore: stats._max.score || 0,
        lowestScore: stats._min.score || 0,
        languageStats,
        latestReviews,
      },
    });

  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
