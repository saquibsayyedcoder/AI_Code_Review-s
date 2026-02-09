import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const reviewLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  keyGenerator: (req) => {
    if (req.user?.id) {
      return req.user.id.toString();
    }
    // fallback for IP addresses (works for IPv4 & IPv6)
    return ipKeyGenerator(req);
  },
  message: {
    success: false,
    message: "Too many review requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
