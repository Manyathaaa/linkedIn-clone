import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token is missing",
      });
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
