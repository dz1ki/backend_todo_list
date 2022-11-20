import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  task: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, required: true, default: false },
  createAd: { type: Date, default: new Date() },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});
export default mongoose.model("notes", NoteSchema);
