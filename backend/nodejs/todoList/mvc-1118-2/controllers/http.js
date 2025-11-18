import cors from "cors";
import { errorHandler } from "../service/errorHandler.js";

export const httpController = {
  cors() {
    return cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  },
  notFound(req, res) {
    errorHandler(req, res, 404, "找不到頁面");
  },
  globalErrorHandler(req, res) {
    errorHandler(req, res, 500, "伺服器錯誤");
  },
};
