// src/api/reviewService.js
import API from "../api/axios";

/**
 * Create a new review
 * @param {Object} data - { code: string, language: string }
 */
export const createReview = async (data) => {
  try {
    const res = await API.post("/review", data); // Gateway will forward to /review
    return res.data;
  } catch (err) {
    console.error("Create review failed:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Get reviews of logged-in user
 */
export const getMyReviews = async () => {
  try {
    const res = await API.get("/review/my-reviews"); // matches your backend
    return res.data;
  } catch (err) {
    console.error("Get my reviews failed:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Get analytics for logged-in user
 */
export const getAnalytics = async () => {
  try {
    const res = await API.get("/review/analytics"); // matches your backend
    return res.data;
  } catch (err) {
    console.error("Get analytics failed:", err.response?.data || err.message);
    throw err;
  }
};
