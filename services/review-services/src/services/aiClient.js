import axios from "axios";

export const getAIReview = async (code, language) => {
  try {
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/api/ai/review`, // full correct endpoint
      { code, language }
    );

    // response.data should be like: { success: true, review: "..." }
    if (!response.data || !response.data.success) {
      throw new Error("AI service returned an invalid response");
    }

    return {
      feedback: response.data.review, // <-- map to 'feedback' for review-service
      score: 0 // AI service currently has no score, default to 0
    };

  } catch (err) {
    console.error("AI service call failed:", err.response?.data || err.message);
    throw new Error("Failed to get AI review");
  }
};
