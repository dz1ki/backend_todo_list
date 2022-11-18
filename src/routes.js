import express from "express";
import { users } from "./user/routes.js";

export const router = express.Router();
router.use("/user", users);
