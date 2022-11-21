import express from "express";
import { registration, autorization } from "./controller.js";

export const users = express.Router();
users.post("/registration", registration);
users.post("/autorization", autorization);
