import Note from "../models/note.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export async function createNote(task, startDate, dueDate, userId) {
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
  return { message: `Task '${task}' successfully added.` };
}

export async function deleteOne(data, userId) {
  const note = await Note.findById({ _id: data.noteId });
  if (!note) {
    throw { message: "No such entry exists" };
  }
  await Note.deleteOne({ _id: data.noteId });
  await User.findByIdAndUpdate(userId, {
    $pull: { notes: data.noteId },
  });
  return { message: "Record successfully deleted" };
}

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

export async function list(userId) {
  const query = User.find({ _id: userId }).populate("notes");
  return query;
}
