import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createReview } from "../controller/review.controller.js";


const router = express.Router();

router.post("/", verifyToken, createReview);

export default router;
