import express from "express";
import mongoose from "mongoose";

const app = express();

// 建立資料庫連線
mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("MongoDB 連線成功");
  })
  .catch((err) => {
    console.error("MongoDB 連線失敗", err);
  });

// 建立 schema
const todoSchema = new mongoose.Schema(
  // 欄位設定
  {
    title: {
      type: String, // 欄位類型
      required: [true, "標題必填"], // 必填欄位
      default: "預設值", // 預設值
      // unique: true, // 唯一值
      // minlength: 5, // 最小長度
      // maxlength: 100, // 最大長度
      // trim: true, // 去除前後空白
      // lowercase: true, // 轉小寫
      // uppercase: true, // 轉大寫
    },
  },
  // schema 配置選項
  {
    versionKey: false, // 關閉 __v 欄位
    timestamps: true, // 開啟時間戳記
  },
);

// 建立 model
const Todo = mongoose.model("todoList", todoSchema);

// 新增資料
Todo.create({
  title: "   待辦事項 1 asf  ",
});

app.listen(8080, () => {
  console.log("伺服器連線成功");
});
