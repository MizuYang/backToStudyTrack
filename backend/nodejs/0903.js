import express from "express";

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

app.listen(8888, () => {
  console.log("伺服器開啟");
});
