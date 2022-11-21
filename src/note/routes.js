import express from "express";
import { addNote, updateNote, deleteNote, listNoteUser } from "./controller.js";
import { authMiddleware } from "../middelewares/auth.middelewares.js";

export const notes = express.Router();
notes.post("/add", authMiddleware, addNote);
notes.patch("/update", authMiddleware, updateNote);
notes.get("/list", authMiddleware, listNoteUser);
notes.delete("/delete", authMiddleware, deleteNote);
