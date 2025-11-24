import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "請提供使用者 ID"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "todoList",
  },
);

export const TodoList = mongoose.model("TodoList", todoListSchema);
