import express from "express";
import path from "path";
import url from "url";
import fs from "fs";

const app = express();

app.get("/response", (req, res) => {
  // 原生回應寫法
  // res.statusCode = 201;
  // res.statusMessage = "Created";
  // res.setHeader("xxx", "yyy");
  // res.write("test");
  // res.end("泥好！ World"); // 這邊會出現亂碼

  res.status(201);
  res.set("aaa", "bbb");
  res.send("泥好！ Express"); // 這邊不會出現亂碼，因為 Express 預設會幫你設定編碼
});

app.get("/", (req, res) => {
  // 重定向
  // res.redirect("/redirect-page");

  // 下載檔案
  // res.download('./ai.png')

  // json
  // res.json({ name: "Mizu", age: 18 });

  // sendFile 回應檔案內容
  const filePath = url.fileURLToPath(import.meta.url);
  const dirname = path.dirname(filePath);
  const formPath = path.resolve(dirname, "./form.html");
  res.sendFile(formPath);
});

app.get("/redirect-page", (req, res) => {
  res.send("你被導向到這個頁面了");
});

const recordEntryTimeMiddleware = (req, res, next) => {
  try {
    const _dirname = url.fileURLToPath(import.meta.url);
    const _filename = path.dirname(_dirname);
    const file = path.resolve(_filename, "./files/追加.txt");
    const now = new Date().toLocaleString();
    fs.appendFileSync(file, `\n ${req.path} => ${now}`);
  } catch (err) {
    console.error(err);
  }
  next();
};

// 全域的 middleware 
app.use(recordEntryTimeMiddleware);

app.get("/page-a", (req, res) => {
  res.send("a");
});
app.get("/page-b", (req, res) => {
  res.send("b");
});

app.listen(8888, () => {
  console.log("伺服器開啟");
});
