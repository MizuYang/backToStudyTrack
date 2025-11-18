import mongoose from "mongoose";

const TodoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "請輸入標題"],
    },
    isFinished: {
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

const TodoList = mongoose.model("TodoList", TodoListSchema);

export default TodoList;
