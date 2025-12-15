import cors from "cors";
import { handleResponse } from "../service/handleResponse.js";

export const httpController = {
  cors: cors(),
  errorHandler: (err, req, res, next) => {
    handleResponse({
      res,
      status: "error",
      statusCode: 500,
      message: `伺服器錯誤，請稍後再試: ${err.message}`,
      err,
    });
  },
  notFoundHandler: (req, res, next) => {
    handleResponse({
      res,
      status: "fail",
      statusCode: 404,
      message: `找不到路徑: ${req.method} ${req.path}`,
    });
  },
  uncaughtException: (err) => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error("Uncaughted Exception！");
    console.error(err);
    // process.exit(1);
  },
  unhandledRejection: (reason, promise) => {
    console.error("未捕捉到的 rejection：", promise, "原因：", reason);
    // 記錄於 log 上
    // process.exit(1);
  },
};
