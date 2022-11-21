import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
/**
 * The function hashes the password.
 * @constructor
 * @param {String} passwordUser User password.
 * @returns {String}
 */
export async function hashPassword(passwordUser) {
  return await bcrypt.hash(passwordUser, 5);
}

/**
 * The function parse the password.
 * @constructor
 * @param {String} password User password request.
 * @param {String} passwordDB User password in database.
 * @returns {String}
 */
export async function parsePassword(password, passwordDB) {
  return await bcrypt.compare(password, passwordDB);
}

/**
 * Function generates a token.
 * @constructor
 * @param {String} id User id.
 * @param {String} email User email.
 * @returns {Object}
 */
export function generateJwt(id, email) {
  return jwt.sign({ id, email }, config.get("JWT.key"), {
    expiresIn: "24h",
  });
}
