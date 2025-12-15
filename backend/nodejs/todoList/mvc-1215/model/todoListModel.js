import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "請填寫待辦事項標題"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "請提供使用者 ID"],
    },
  },
  {
    collection: "todoList",
    timestamps: true,
    versionKey: false,
  },
);

export const TodoList = mongoose.model("TodoList", todoListSchema);
