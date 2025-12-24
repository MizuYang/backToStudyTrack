import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "請提供使用者 ID"],
    },
    title: {
      type: String,
      required: [true, "請提供待辦事項標題"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "todoList", timestamps: true, versionKey: false },
);

const TodoList = mongoose.model("TodoList", todoListSchema);

export default TodoList;
