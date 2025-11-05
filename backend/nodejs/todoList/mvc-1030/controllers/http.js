import cors from "cors";
import { handleError } from "../service/handleError.js";

const http = {
  cors() {
    return cors({
      origin: "*", // 或指定允許的來源，例如 "http://localhost:3000"
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  },
  notFound() {
    return (req, res) => handleError(res, 404, "找不到此路123由");
  },
  globalErrorHandler() {
    return (err, req, res, next) => {
      console.error(err.stack);
      handleError(res, 500, "伺服器錯誤");
      next();
    };
  },
};

export default http;
