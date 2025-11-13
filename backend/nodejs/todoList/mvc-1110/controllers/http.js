import cors from "cors";
import { errorHandler } from "../service/error.js";

const PORT = 8000;

export const httpHandler = {
  cors() {
    return cors({
      origin: `http://localhost:${PORT}`,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  },
  notFound(req, res) {
    return errorHandler(req, res, 404, "找不到此路由");
  },
  globalErrorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    const message = err.message || "伺服器內部錯誤";
    return errorHandler(req, res, statusCode, message);
  },
};
