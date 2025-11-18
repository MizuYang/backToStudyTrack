import express from "express";
import httpController from "./controllers/http.js";
import todoRouter from "./routes/todoList.js";

const app = express();
const BASE_URL = "/api/todoList";

// 連線資料庫
import "./connections/index.js";

// 解析前端傳來的 JSON 資料
app.use(express.json());

// cors
app.use(httpController.cors());

// 建立路由
// todoList
app.use(BASE_URL, todoRouter);

// 404 處理
app.use((req, res) => httpController.notFound(req, res));

// 捕捉所有未定義的路由
app.use((err, req, res) => httpController.globalErrorHandler(err, req, res));

export default app;
