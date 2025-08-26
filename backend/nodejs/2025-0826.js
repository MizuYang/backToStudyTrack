import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

console.clear();

const server = http.createServer((req, res) => {
  if (req.method !== "GET") res.end("只支援 GET 方法");

  const filename = url.fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const filePath = req.url;
  const ext = path.extname(filePath).slice(1);

  // 讀取檔案然後回傳出去
  try {
    res.setHeader("Content-Type", `text/${ext}; charset=utf-8`);
    const file = fs.readFileSync(`${dirname}${filePath}`);
    res.end(file);
  } catch (err) {
    res.statusCode = 404;
    res.end("找不到頁面 404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("伺服器開始連接... http://localhost:3000");
});
