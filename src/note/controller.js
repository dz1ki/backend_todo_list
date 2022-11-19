import { createNote, updateOneNote, deleteOne, list } from "./service.js";
// import User from "../models/user.js"
// import Note from "../models/note.js"

export async function addNote(req, res) {
  try {
    const userId = req.user.id;
    const { task, startDate, dueDate } = req.body;
    const result = await createNote(task, startDate, dueDate, userId);
    // const note = new Note({ task, startDate, dueDate, userId });
    // const createdCar = await note.save();
    // const user = await User.find().populate("notesUser");
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function deleteNote(req, res) {
  try {
    const data = req.query;
    const userId = req.user.id;
    const result = await deleteOne(data, userId);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function listNoteUser(req, res) {
  try {
    const userId = req.user.id;
    const result = await list(userId);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function updateNote(req, res) {
  try {
    const data = req.query;
    const userId = req.user.id;
    const { task, startDate, dueDate, completed } = req.body;
    const result = await updateOneNote(
      task,
      startDate,
      dueDate,
      completed,
      userId,
      data.noteId
    );
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
