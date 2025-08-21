import { clear } from "console";
import http from "http";

clear();

const server = http.createServer((req, res) => {
  // 取得網址
  // console.log("網址", req.url);

  // 取得請求方法
  // console.log("請求方法", req.method);

  // 取得請求版本
  // console.log("請求版本", req.httpVersion);

  // 取得請求標頭
  // console.log("請求標頭", req.headers);

  // 取得請求主機
  // console.log("請求主機", req.headers.host);

  // 取得請求體
  // console.log("請求體", req.body);

  // 讀取請求體資料事件
  req.on("data", (chunk) => {
    console.log("請求體資料塊:", chunk.toString());
  });

  // 請求結束後觸發的事件
  req.on("end", () => {
    console.log("請求結束");
  });

  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("伺服器開始連接...");
});
