import express from "express";
import todoListRouter from "./routes/todoList.js";
import { httpController } from "./controllers/http.js";

// 連線資料庫
import "./connections/index.js";

const app = express();
const PROJECT_NAME = "todoList";
const BASE_URL = `/${PROJECT_NAME}/api/v1`;

// 解析 JSON 格式的請求主體
app.use(express.json());

app.use(httpController.cors());

// todoList 路由
app.use(BASE_URL, todoListRouter);

// 404
app.use((req, res, next) => {
  httpController.notFound(req, res);
});

// 全域錯誤處理
app.use((err, req, res, next) =>
  httpController.globalErrorHandler(req, res, err),
);

export default app;
