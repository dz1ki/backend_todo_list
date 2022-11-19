import express from "express";
import { users } from "./user/routes.js";
import { notes } from "./note/routes.js";

export const router = express.Router();
router.use("/user", users);
router.use("/note", notes);
