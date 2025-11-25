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
  globalErrorHandler(err, req, res) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "伺服器錯誤";
    errorHandler(req, res, statusCode, message);
  },
};
