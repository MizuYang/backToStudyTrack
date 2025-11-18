import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => console.log("MongoDB 連線成功"))
  .catch((err) => console.error("MongoDB 連線失敗:", err));
