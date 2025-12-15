import cors from "cors";

// TODO: 之後再將錯誤訊息區分環境, 開發環境顯示詳細錯誤訊息, 產品環境顯示簡易錯誤訊息
export const httpController = {
  cors: cors(),
  errorHandler: (err, req, res, next) => {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: `伺服器錯誤，請稍後再試: ${err.message}`,
    });
  },
  notFoundHandler: (req, res, next) => {
    res.status(404).json({
      status: "fail",
      statusCode: 404,
      message: "404 Not Found",
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
