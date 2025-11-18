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
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "todoList",
  },
);

export const TodoList = mongoose.model("TodoList", todoListSchema);
