import jwt from "jsonwebtoken";
import config from "config";

/**
 * Middleware checks if the user is authorized if ok writes the user data to the request.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 * @param {Function} next
 */

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const data = jwt.verify(token, config.get("JWT.key"));
    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
}
