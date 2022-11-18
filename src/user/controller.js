import { create, authorizationUser } from "./service.js";

export async function registration(req, res) {
  try {
    const { email, password, uaserName } = req.body;
    const result = await create(email, password, uaserName);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
export async function autorization(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authorizationUser(email, password);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
