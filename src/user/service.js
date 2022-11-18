import User from "../models/user.js";
import { generateJwt, hashPassword, parsePassword } from "./helper.js";

export async function create(email, password, uaserName) {
  const oneUser = await User.findOne({ email });
  if (oneUser) {
    throw { message: "There is already a user with this mail" };
  }
  const resultHash = await hashPassword(password);
  await User.create({ email, password: resultHash, uaserName });
  return { message: "User successfully registered" };
}

export async function authorizationUser(emailUser, password) {
  const findUser = await User.findOne({ email: emailUser });
  if (!findUser) {
    throw { message: "No such user exists" };
  }
  const resultParse = await parsePassword(password, findUser.password);
  if (!resultParse) {
    throw { message: "Wrong password" };
  }
  const token = generateJwt(findUser.id, findUser.email);
  console.log(findUser.id, findUser.email);
  return { message: "User is authorized", token };
}
