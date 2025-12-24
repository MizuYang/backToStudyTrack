import cors from "cors";
import handleResponse from "../service/handleResponse.js";

const httpController = {
  cors() {
    return cors();
  },
  notFoundHandler(req, res, next) {
    handleResponse({
      res,
      status: "fail",
      statusCode: 404,
      message: "找不到頁面",
      data: null,
    });
  },
  globalErrorHandler(err, req, res, next) {
    handleResponse({
      res,
      status: "error",
      statusCode: 500,
      message: err.message,
      data: null,
      err,
    });
  },
  uncaughtException() {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error("Uncaughted Exception！");
    console.error(err);
    // process.exit(1);
  },
  unhandledRejection() {
    console.error("未捕捉到的 rejection：", promise, "原因：", reason);
    // 記錄於 log 上
    // process.exit(1);
  },
};

export default httpController;
