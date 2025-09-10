import express from "express";
import url from "url";
import path from "path";
import bodyParser from "body-parser";

/**
 * GET  /login 顯示表單網頁
 * POST /login 獲取表單中的 用戶名、密碼
 */

const app = express();

// 解析 JSON 格式的請求體
const jsonParser = bodyParser.json();

// 解析 query string 格式的請求體
const urlencodedParser = bodyParser.urlencoded();

// http://localhost:8888/form
app.get("/form", (req, res) => {
  const _filename = url.fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);
  const filePath = path.resolve(`${_dirname}/form.html`);
  res.sendFile(filePath);
});

app.get("/login", (req, res) => {
  res.send("/login => get");
});
// 在此設定路由的請求體解析設定
app.post("/login", urlencodedParser, (req, res) => {
  // 這邊就能透過 req.body 取得請求體
  console.log(req.body);
  res.send("/login => post");
});

app.get("/images", (req, res) => {
  // 如果不是從 localhost 來的請求，就回傳錯誤
  if (req.hostname !== "localhost") {
    return res.status(400).send("錯誤的 Host");
  }

  const _filename = url.fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);
  const filePath = path.resolve(`${_dirname}/ai.png`);

  res.sendFile(filePath);
});

app.listen(8888, () => {
  console.log("伺服器開啟");
});
