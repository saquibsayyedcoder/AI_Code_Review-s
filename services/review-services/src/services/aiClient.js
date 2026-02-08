import axios from "axios";

export const getAIReview = async (code, language) => {
  const response = await axios.post(
    `${process.env.AI_SERVICE_URL}/review`,
    { code, language }
  );

  return response.data;
};
