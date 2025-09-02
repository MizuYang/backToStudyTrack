import express from "express";

const app = express();

// 請求方法是 get, 路徑是 /, 執行對應的處理函式
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/request/:id", (req, res) => {
  // http://localhost:8080/request?name=mizu&age=18&pets=8cat,dog
  console.log("req.method", req.method);
  console.log("req.url", req.url);
  console.log("req.httpVersion", req.httpVersion);
  console.log("req.headers", req.headers);

  // express 相關方法
  console.log("req.path", req.path);
  console.log("req.query", req.query);
  console.log("req.hostname", req.hostname);
  console.log('req.params', req.params.id);
  // 獲取 ip
  console.log("req.ip", req.ip);
  console.log("req.ips", req.ips);
  // 獲取請求頭
  console.log('User-Agent', req.get('User-Agent'));
  console.log('Content-Type', req.get('Content-Type'));
  console.log('host', req.get('host'));
  // 獲取子網域 (假設有設定子網域)
  console.log("req.subdomains", req.subdomains);

  // 設定狀態碼
  res.status(201);
  // 設定回應標頭 (X-Powered-By 通常用來表明支援網站的技術，不過在生產環境中，出於安全考量，有時會移除或修改此標頭，以避免洩露伺服器技術資訊。)
  res.set("X-Powered-By", "Node.js");
  // 回應內容
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
