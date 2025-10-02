import mongoose from "mongoose";

// 連線 mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mizuDB");

// 連接成功
mongoose.connection.on("open", () => {
  console.log("open");
});
// 連接失敗
mongoose.connection.on("error", () => {
  console.log("error");
});
// 連接結束
mongoose.connection.on("close", () => {
  console.log("close");
});

// 測試結束連接
setTimeout(() => {
  mongoose.connection.close();
}, 1000);
