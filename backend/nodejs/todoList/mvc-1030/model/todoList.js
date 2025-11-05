import mongoose from "mongoose";

// 建立 schema
const todoSchema = new mongoose.Schema(
  // 欄位設定
  {
    title: {
      type: String,
      required: [true, "標題必填！"],
    },
  },
  // schema 配置選項
  {
    versionKey: false,
    timestamps: true,
    collection: "todoList",
  },
);
// 建立 model
const TodoList = mongoose.model("todoList", todoSchema);

export default TodoList;
