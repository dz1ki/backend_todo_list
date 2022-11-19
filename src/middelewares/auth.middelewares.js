import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../data/constants.js";

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
}
