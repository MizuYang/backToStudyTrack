import http from "http";
import path from "path";
import url from "url";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method !== "GET") res.end("只支援 GET 方法");

  const filename = url.fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const filePath = `${dirname}${req.url}`;

  try {
    const file = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1);
    const imageExts = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
    
    if (imageExts.includes(ext)) {
      res.setHeader("Content-Type", `image/${ext}; charset=utf-8`);
    } else {
      res.setHeader("Content-Type", `text/${ext}; charset=utf-8`);
    }

    res.end(file);
  } catch (err) {
    res.statusCode = 404;
    res.end("找不到頁面 404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("伺服器開始連接... http://localhost:3000");
});
