import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("mongoose 連線成功");
  })
  .catch(() => {
    console.log("mongoose 連線失敗");
  });
