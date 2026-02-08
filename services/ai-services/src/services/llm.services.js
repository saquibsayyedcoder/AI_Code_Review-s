import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateReview = async (code, language) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are a senior software engineer.
Review the following ${language} code.
Give improvements, best practices, and optimizations.

Code:
${code}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (error) {
    console.error("FULL GEMINI ERROR:", error);
    throw new Error("AI Service Error");
  }
};
