import cors from "cors";
import { errorHandler } from "../service/error.js";

const PORT = 8000;

const httpController = {
  cors() {
    return cors({
      origin: `http://localhost:${PORT}`,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  },
  notFound(req, res) {
    errorHandler(req, res, 404, "找不到路由");
  },
  globalErrorHandler(err, req, res) {
    const statusCode = err.status || 500;
    const message = err.message || "伺服器內部錯誤";
    return errorHandler(req, res, statusCode, message);
  },
};

export default httpController;
