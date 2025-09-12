import express from "express";
import formidable from "formidable";
import url from "url";
import path from "path";

const app = express();

app.post("/file", (req, res) => {
  const _filename = url.fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);
  // 將圖片存在 public/uploads 靜態資料夾 (需要自己先建立 uploads 資料夾)
  const uploadDir = path.resolve(_dirname, "../../public/uploads");

  const form = formidable({
    // 多個檔案上傳
    // multiples: true,
    // 上傳檔案的資料夾
    uploadDir,
    // 保留副檔名
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    // 回傳圖片的網址
    const imageUrl = `${req.protocol}://${req.headers.host}/uploads/${files.file[0].newFilename}`;

    res.json({
      message: "檔案上傳成功",
      data: {
        // http://localhost:8888/uploads/i3z86itrrmmazdljze6cgzf19.jpeg
        url: imageUrl,
      },
    });
  });
});

// 設定圖片讀取
app.get("/uploads/:filename", (req, res) => {
  const _filename = url.fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);
  const { filename } = req.params;

  // 讀取圖片的實際路徑，並回傳圖片給前端畫面
  const uploadDir = path.resolve(_dirname, `../../public/uploads/${filename}`);

  res.sendFile(uploadDir);
});

app.listen(8888, () => {
  console.log("Server is running on http://localhost:8888");
});
