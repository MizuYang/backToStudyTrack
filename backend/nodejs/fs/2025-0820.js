// path 模組
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// 絕對路徑: /Users/chuchyang/Desktop/...略/fs/index.html
console.log(path.resolve(__dirname, "./index.html"));

// 網址解析
// https://search.js.com:443/search?keyword=xxx&psort=3
// 協議名: https
// 主機名: search.js.com
// 端口號: 443
// 路徑: /search
// 查詢字串: ?keyword=xxx&psort=3
