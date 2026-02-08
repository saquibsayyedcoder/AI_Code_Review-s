import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", req.headers.authorization);

  


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("JWT_SECRET:", process.env.JWT_SECRET);

    req.user = decoded; // contains id + email
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
