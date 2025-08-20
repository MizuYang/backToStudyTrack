// path 模組
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// 絕對路徑: /Users/chuchyang/Desktop/...略/fs/index.html
console.log(path.resolve(__dirname, "./index.html"));

