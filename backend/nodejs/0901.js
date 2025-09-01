import express from "express";

const app = express();

// 請求方法是 get, 路徑是 /, 執行對應的處理函式
app.get("/", (req, res) => {
  res.send("Hello World");
});

// .all 可以接受所有的請求方法
app.all("/home", (req, res) => {
  res.send("home");
});

// 使用 * 處理所有未定義的路由
// app.all("*", (req, res) => {
//   res.send("Not Found");
// });

// 使用 app.use 處理所有未定義的路由
app.use((req, res) => {
  res.status(404);
  res.send("Not Found");
});

app.listen("8080", () => {
  console.log("伺服器開啟");
});
