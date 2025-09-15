import express from "express";
import url from "url";
import path from "path";
import formidable from "formidable";

const app = express();

const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// 設定回傳 form.html 給前端做檔案上傳
app.get("/form", (req, res) => {
  const formPath = path.resolve(_dirname, "./form.html");
  res.sendFile(formPath);
});

// 設定檔案上傳取得 file 的資料(formidable)、儲存的路徑位置、檔案副檔名、將檔案路徑回傳於 JSON 中
app.post("/file", (req, res, next) => {
  const uploadDir = path.resolve(_dirname, "../../public/uploads");
  const form = formidable({
    // 設定檔案上傳檔案儲存的路徑
    uploadDir,
    // 保留副檔名
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const url = `http://${req.host}/${files.file[0].newFilename}`;

    res.json({
      message: "檔案上傳成功",
      url,
    });
  });
});

// 將檔案圖片路徑，取出圖片來回傳到前端畫面上
app.get("/:filename", (req, res) => {
  const { filename } = req.params;
  const imgPath = path.resolve(_dirname, `../../public/uploads/${filename}`);
  res.sendFile(imgPath);
});

app.listen(8888, () => {
  console.log("Server is running on http://localhost:8888");
});
