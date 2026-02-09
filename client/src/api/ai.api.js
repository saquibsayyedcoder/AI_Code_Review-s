import API from "./axios";

// Send code to AI
export const reviewCode = async (data) => {
  const res = await API.post("/ai/review", data);
  return res.data;
};
