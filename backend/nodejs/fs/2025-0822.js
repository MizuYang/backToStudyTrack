// 請求練習
/**
 * 功能敘述：
 * 請求路徑為 /login, 回傳 登入頁面
 * 請求路徑為 /register, 回傳 註冊頁面
 * 其他路徑回傳 404 Not Found
 */

// 建立連線
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

const server = http.createServer((req, res) => {
  // 取得請求方法
  const { method } = req;
  if (method !== "GET") res.end("只支援 GET 方法");

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  // 設定多個同名響應頭
  // res.setHeader("Set-Cookie", ["a", "b", "c"]);

  if (req.url === "/login" || req.url === "/register") {
    // 取得當前檔案路徑
    const filePath = url.fileURLToPath(import.meta.url);
    // 取得當前資料夾路徑
    const dirname = path.dirname(filePath);
    // 取得 html 檔案
    const [_, fileName] = req.url.split("/");
    try {
      const html = fs.readFileSync(`${dirname}/files/${fileName}.html`);
      res.end(html);
    } catch (err) {
      res.statusCode = 404;
      res.end("找不到頁面 404 Not Found");
    }
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("伺服器開始連接... http://localhost:3000");
});
