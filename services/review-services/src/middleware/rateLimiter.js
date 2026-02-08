import rateLimit from "express-rate-limit";

export const reviewLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 reviews per minute per user

  keyGenerator: (req) => {
    if (req.user?.id) {
      return req.user.id.toString(); // limit per user
    }
    return req.ip; // fallback if no user
  },

  message: {
    success: false,
    message: "Too many review requests. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});
