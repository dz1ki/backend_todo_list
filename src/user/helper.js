import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../data/constants.js";

export async function hashPassword(passwordUser) {
  return await bcrypt.hash(passwordUser, 5);
}
export async function parsePassword(password, passwordDB) {
  return await bcrypt.compare(password, passwordDB);
}

export function generateJwt(id, email) {
  return jwt.sign({ id, email }, SECRET_KEY, {
    expiresIn: "24h",
  });
}
