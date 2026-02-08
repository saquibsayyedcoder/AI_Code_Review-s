import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createReview, getAnalytics, getMyReviews } from "../controller/review.controller.js";
import { reviewLimiter } from "../middleware/rateLimiter.js";


const router = express.Router();

router.post("/", verifyToken, reviewLimiter, createReview);
router.get("/my-reviews", verifyToken, getMyReviews);
router.get("/analytics", verifyToken, getAnalytics);

export default router;
