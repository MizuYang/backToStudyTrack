import express from "express";
import formidable from "formidable";

const app = express();

app.post("/file", (req, res) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log("fields", fields); // text, radio, checkbox, select
    console.log("files", files); // file
    res.json({ fields, files });
  });
});

app.listen(8888, () => {
  console.log("Server is running on http://localhost:8888");
});
