import express from "express";
import cors from "cors";
import todoListRouter from "./routers/todoList.js";

// 建立資料庫連線
import "./connections/index.js";

const app = express();

// 解析前端傳來的 JSON 資料
app.use(express.json());

// CORS 設定
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 使用 todoList 路由
app.use("/api/todoList", todoListRouter);

// 處理 404 錯誤
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "404 Not Found",
    data: null,
  });
});

// 處理全域錯誤
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    statusCode,
    message,
    data: null,
  });
});

export default app;
