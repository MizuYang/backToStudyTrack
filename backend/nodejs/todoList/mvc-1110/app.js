import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("mongoose 連線成功");
  })
  .catch(() => {
    console.log("mongoose 連線失敗");
  });

// 建立 schema
const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "請填寫待辦事項"],
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

// 解析前端傳來的 JSON 資料
app.use(express.json());

// cors
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.listen(PORT, () => {
  console.log("伺服器連線成功: ", PORT);
});
