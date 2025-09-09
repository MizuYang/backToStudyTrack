import express from "express";
import url from "url";
import path from "path";

const app = express();

const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// 指定靜態檔案的資料夾路徑
const publicPath = path.resolve(`${_dirname}/../../public`);

/**
 * 可使用 http://localhost:8888/icons/arrow-left.svg 來存取
 * 注意: public 必須要有 icons/arrow-left.svg 才讀取得到
 */
app.use(express.static(publicPath));

app.listen(8888, () => {
  console.log("伺服器開啟");
});
