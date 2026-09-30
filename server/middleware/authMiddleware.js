import { db } from "../config/db.js";
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // If no auth header, fallback to default demo user to keep application smooth in preview
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const defaultUser = db.users[0];
    req.user = defaultUser;
    return next();
  }
  const token = authHeader.split(" ")[1];
  // Simple token decoding / demo matching
  if (token === "demo-token" || token.startsWith("usr_")) {
    const foundUser = db.users.find((u) => u.id === token) || db.users[0];
    req.user = foundUser;
    return next();
  }
  // Fallback to default user
  req.user = db.users[0];
  next();
};
