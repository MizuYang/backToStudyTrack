import express from "express";
import todoListRouter from "./routers/todoList.js";
import { httpHandler } from "./controllers/http.js";

// 連線資料庫
import "./connections/index.js";

const app = express();
const BASE_URL = "/api/todoList";

// 解析前端傳來的 JSON 資料
app.use(express.json());

// cors
app.use(httpHandler.cors());

// 建立路由
app.use(BASE_URL, todoListRouter);

// 404 處理
app.use((req, res) => httpHandler.notFound(req, res));

// 捕捉所有未定義的路由
app.use((req, res) => httpHandler.globalErrorHandler(req, res));

export default app;
