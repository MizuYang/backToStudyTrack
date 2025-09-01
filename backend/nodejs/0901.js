import express from "express";

const app = express();

// 請求方法是 get, 路徑是 /, 執行對應的處理函式
app.get("/", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.ip);

  res.send("Hello World");
});

app.listen("8080", () => {
  console.log("伺服器開啟");
});
