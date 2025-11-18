import mongoose from "mongoose";

// 建立 schema
const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "項"],
    },
    isFinished: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "todoList",
  },
);
// 建立 model
const TodoList = mongoose.model("todoList", todoListSchema);

export default TodoList;
