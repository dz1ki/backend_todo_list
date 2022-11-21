import { createNote, updateOneNote, deleteOne, list } from "./service.js";

/**
 * The controller function fetches data from the request calls the function "createNote" and return the responce.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 */
export async function addNote(req, res) {
  try {
    const userId = req.user.id;
    const { task, startDate, dueDate } = req.body;
    const result = await createNote(task, startDate, dueDate, userId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
}

/**
 * The controller function fetches data from the request calls the function "deleteOne" and return the responce.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 */
export async function deleteNote(req, res) {
  try {
    const data = req.query;
    const userId = req.user.id;
    const result = await deleteOne(data, userId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
}

/**
 * The controller function fetches data from the request calls the function "list" and return the responce.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 */
export async function listNoteUser(req, res) {
  try {
    const userId = req.user.id;
    const { complited, limit, skip } = req.query;
    const result = await list(userId, complited, limit, skip);
    res.status(result.statusCode || 200).json(result);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
}

/**
 * The controller function fetches data from the request calls the function "updateOneNote" and return the responce.
 * @constructor
 * @param {Object} req Request object.
 * @param {Object} res Responce object.
 */
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
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(e.statusCode || 500).json(e.message);
  }
}
