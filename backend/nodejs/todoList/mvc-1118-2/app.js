import express from "express";
import todoListRouter from "./routers/todoList.js";
import { httpController } from "./controllers/http.js";

// 連線伺服器
import "./connections/index.js";

const app = express();
const PROJECT_NAME = "todoList";
const BASE_URL = `/${PROJECT_NAME}/api/v1`;

app.use(express.json());
app.use(httpController.cors());

// routes
// todoList
app.use(BASE_URL, todoListRouter);

// 404
app.use((req, res) => httpController.notFound(req, res));

// 全域錯誤處理
app.use((err, req, res) => httpController.globalErrorHandler(req, res));

export default app;
