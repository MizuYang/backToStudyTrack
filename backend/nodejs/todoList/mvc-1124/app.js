import express from "express";
import todoListRouter from "./routers/todoList.js";
import { httpController } from "./controllers/http.js";
// import { User } from "./model/userModel.js";

// 連線伺服器
import "./connections/index.js";

const app = express();
const PROJECT_NAME = "todoList";
const BASE_URL = `/${PROJECT_NAME}/api/v1`;

app.use(express.json());
app.use(httpController.cors());

// 建立假的 user 資料
// const createFakeUser = async () => {
//   try {
//     const user = await User.create({
//       username: "IU",
//       email: "test3@example.com",
//       password: "password",
//       age: 30,
//       address: "123 Main St",
//     });
//     console.log("成功建立使用者:", user._id);
//   } catch (error) {
//     console.error("建立使用者時發生錯誤:", error.message);
//   }
// };

// createFakeUser();

// routes
// todoList
app.use(BASE_URL, todoListRouter);

// 404
app.use((req, res) => httpController.notFound(req, res));

// 全域錯誤處理
app.use((err, req, res) => httpController.globalErrorHandler(req, res));

export default app;
