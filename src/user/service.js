import User from "../models/user.js";
import { generateJwt, hashPassword, parsePassword } from "./helper.js";

/**
 * The function creates a new user.
 * @constructor
 * @param {String} email User email.
 * @param {String} password User password.
 * @param {String} userName User name.
 * @returns {Object}
 */
export async function create(email, password, userName) {
  const oneUser = await User.findOne({ email });
  if (oneUser) {
    throw {
      message: "There is already a user with this mail",
      statusCode: 400,
    };
  }
  const resultHash = await hashPassword(password);
  const prototype = await User.create({
    email,
    password: resultHash,
    userName,
  });
  await prototype.save();
  return { message: "User successfully registered", statusCode: 201 };
}

/**
 * The function authorizes the registered user
 * @constructor
 * @param {String} emailUser User email.
 * @param {String} password User password.
 * @returns {Object} Return token.
 */
export async function authorizationUser(emailUser, password) {
  const findUser = await User.findOne({ email: emailUser });
  if (!findUser) {
    throw { message: "No such user exists", statusCode: 400 };
  }
  const resultParse = await parsePassword(password, findUser.password);
  if (!resultParse) {
    throw { message: "Wrong password", statusCode: 400 };
  }
  const token = generateJwt(findUser.id, findUser.email);
  return { message: "User is authorized", token };
}
