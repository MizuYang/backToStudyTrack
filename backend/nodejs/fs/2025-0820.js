// path 模組
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// 絕對路徑: /Users/chuchyang/Desktop/...略/fs/index.html
// console.log(path.resolve(__dirname, "./index.html"));

// 網址解析
// https://search.js.com:443/search?keyword=xxx&psort=3
// 協議名: https
// 主機名: search.js.com
// 端口號: 443
// 路徑: /search
// 查詢字串: ?keyword=xxx&psort=3

// 建立 http 對象
import http from "http";

const server = http.createServer((req, res) => {
  // 開啟網址 http://localhost:8080 後，透過瀏覽器發送請求後，會執行這裡的程式碼
  console.log("收到請求:", {
    method: req.method,
    url: req.url,
    headers: req.headers
  });
  
  // 設定響應頭
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  // 設定回應內容
  res.end("回應內容");
});

// 建立伺服器連接
server.listen(8080, () => {
  console.log("啟動伺服器: 端口 8080");
});