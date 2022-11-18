import mongoose from "mongoose";

const ToDoList = new mongoose.Schema({
  task: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
});
export default mongoose.model("todo", ToDoList);
