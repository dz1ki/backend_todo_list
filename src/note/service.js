import Note from "../models/note.js";
import User from "../models/user.js";
import { calcPagination, objectFilter } from "./helper.js";

/**
 * The function creates a new note for the user.
 * @constructor
 * @param {String} task Note description.
 * @param {Date} startDate Execution start date.
 * @param {Date} dueDate Expiration date
 * @param {String} userId User id.
 * @returns {Object}
 */
export async function createNote(task, startDate, dueDate, userId) {
  if (!(task && startDate && dueDate)) {
    throw {
      message: "Fields : task, startDate, dueDate required!",
      statusCode: 400,
    };
  }
  const note = await Note.create({
    task,
    startDate,
    dueDate,
    user: userId,
  });

  await User.updateOne(
    { _id: userId },
    { $push: { notes: note.id } },
    { new: true, useFindAndModify: false }
  );
  return { message: `Task '${task}' successfully added.`, statusCode: 201 };
}

/**
 * Еhe function deletes the note from the user
 * @constructor
 * @param {Object} data The note id is stored in the object
 * @param {String} userId User id.
 * @returns {Object}
 */
export async function deleteOne(data, userId) {
  const note = await Note.findById({ _id: data.noteId });
  if (!note) {
    throw { message: "No such entry exists", statusCode: 400 };
  }
  await Note.deleteOne({ _id: data.noteId });
  await User.findByIdAndUpdate(userId, {
    $pull: { notes: data.noteId },
  });
  return { message: "Record successfully deleted" };
}

/**
 * The function updates the note.
 * @constructor
 * @param {String} task Note description.
 * @param {Date} startDate Execution start date.
 * @param {Date} dueDate Expiration date.
 * @param {Boolean} completed Status.
 * @param {Object} data The note id is stored in the object
 * @param {String} userId User id.
 * @param {String} noteId The note id is stored in the object
 * @returns {Object}
 */
export async function updateOneNote(
  task,
  startDate,
  dueDate,
  completed,
  userId,
  noteId
) {
  await Note.findByIdAndUpdate(noteId, {
    task,
    startDate,
    dueDate,
    completed,
    userId,
  });
  return { message: "Record updated successfully." };
}

/**
 * The function retrieves the user's notes from the database and applies filters.
 * @constructor
 * @param {Boolean} completed Status.
 * @param {number} skipPage Page number.
 * @param {number} limitPage Number of posts per page.
 * @param {String} userId User id.
 * @returns {Array} Record List.
 */
export async function list(userId, complited, limitPage, skipPage) {
  const skipResult = calcPagination(skipPage, limitPage);
  const objFilterResult = objectFilter(userId, complited);
  const result = await Note.find(objFilterResult)
    .skip(skipResult)
    .limit(limitPage);
  return result;
}
