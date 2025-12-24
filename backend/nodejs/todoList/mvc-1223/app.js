import express from "express";
import todoListRouter from "./routes/todoListRouter.js";
import httpController from "./controllers/httpController.js";

// mongoose 連線
import "./connections/index.js";

const API_BASE_PATH = "/todoList/api/v1";

const app = express();

app.use(express.json());
app.use(httpController.cors());

// api router
app.use(API_BASE_PATH, todoListRouter);

app.use(httpController.notFoundHandler);

app.use(httpController.globalErrorHandler);

// 未捕捉到的例外
process.on("uncaughtException", httpController.uncaughtException);

// 未捕捉到的 catch
process.on("unhandledRejection", httpController.unhandledRejection);

export default app;
