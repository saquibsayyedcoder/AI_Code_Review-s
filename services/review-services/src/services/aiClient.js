import axios from "axios";

export const getAIReview = async (code, language) => {
  try {
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/review`,
      { code, language }
    );

    if (!response.data || !response.data.success) {
      throw new Error("AI service returned invalid response");
    }

    // Here we map the AI review text to feedback
    const feedback = response.data.review || "No feedback available";

    // Optionally, generate a score based on feedback length or keywords
    const score = Math.min(10, Math.floor(feedback.split(" ").length / 50)); // simple example

    return { feedback, score };

  } catch (err) {
    console.error("AI service call failed:", err.response?.data || err.message);
    throw new Error("Failed to get AI review");
  }
};
