import { create, authorizationUser } from "./service.js";

/**
 * The controller function fetches data from the request calls the function "create" and return the responce.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 */
export async function registration(req, res) {
  try {
    const { email, password, userName } = req.body;
    const result = await create(email, password, userName);
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
}

/**
 * The controller function fetches data from the request calls the function "authorizationUser" and return the responce.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 */
export async function autorization(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authorizationUser(email, password);
    res.status(result.statusCode || 200).json(result);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
}
