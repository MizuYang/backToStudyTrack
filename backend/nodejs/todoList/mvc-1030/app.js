import express from "express";
import todoListRouter from "./routers/todoList.js";
import httpControllers from "./controllers/http.js";
import "./connections/index.js";

// 建立資料庫連線
const app = express();

// 1. CORS 設定（處理 OPTIONS 預先檢查）
app.use(httpControllers.cors());

// 2. 其他 middleware 設定
// 解析前端傳來的 JSON 資料, 使後端能直接使用 req.body 取得資料
app.use(express.json());

// 3. 註冊路由
// API 路由
app.use("/api/todoList", todoListRouter);

// 4. 404 錯誤處理（放在所有路由之後）
app.use(httpControllers.notFound());

// 5. 全域錯誤處理
app.use(httpControllers.globalErrorHandler());

export default app;
