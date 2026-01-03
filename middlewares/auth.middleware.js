import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const isUserAuthorized = async (req, res, next) => {
  try {
    const token = req.cookies?.userToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User is not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: `${userRole || 'User'} not allowed to access this resource` });
    }
    next();
  };
};
