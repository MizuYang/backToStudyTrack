import cors from "cors";
import { errorHandler } from "../service/error.js";

export const httpController = {
  cors() {
    return cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  },
  notFound(req, res) {
    return errorHandler(req, res, 404, "找不到路由");
  },
  globalErrorHandler(req, res, err) {
    const message = err.message || "伺服器錯誤";
    return errorHandler(req, res, 500, message);
  },
};
