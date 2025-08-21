// import http from "http";

console.clear();

// const server = http.createServer((req, res) => {
//   // 取得網址
//   // console.log("網址", req.url);

//   // 取得請求方法
//   // console.log("請求方法", req.method);

//   // 取得請求版本
//   // console.log("請求版本", req.httpVersion);

//   // 取得請求標頭
//   // console.log("請求標頭", req.headers);

//   // 取得請求主機
//   // console.log("請求主機", req.headers.host);

//   // 取得請求體
//   // console.log("請求體", req.body);

//   // 讀取請求體資料事件
//   req.on("data", (chunk) => {
//     console.log("請求體資料塊:", chunk.toString());
//   });

//   // 請求結束後觸發的事件
//   req.on("end", () => {
//     console.log("請求結束");
//   });

//   res.end("Hello World");
// });

// server.listen(3000, () => {
//   console.log("伺服器開始連接... http://localhost:3000");
// });

// 取得請求中的 url 路徑、query 字串 - 方法一
// import http from "http";
// import url from "url";

// const server = http.createServer((req, res) => {
//   const parseUrl = url.parse(req.url, true);
//   // console.log("parseUrl: ", parseUrl);

//   // 取得 query
//   const { query } = parseUrl;
//   console.log("query: ", query);

//   // 取得路徑
//   const { pathname } = parseUrl;
//   console.log("pathname: ", pathname);

//   res.end("Hello World");
// });

// server.listen(3000, () => {
//   console.log("伺服器開始連接... http://localhost:3000");
// });

// 取得請求中的 url 路徑、query 字串 - 方法二(推薦)
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.headers);
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 取得 query
  const search = url.searchParams.get("search"); // 這裡依據實際的 query 參數名稱來獲取
  console.log("search: ", search);
  // 取得路徑
  console.log(url.pathname);

  res.end("Hello World");
});

server.listen(3000, () => {
  console.log("伺服器開始連接... http://localhost:3000");
});
