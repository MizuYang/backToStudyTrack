import express from "express";

const app = express();

const checkProductMiddleware = (req, res, next) => {
  if (req.query.productId) {
    next();
    return;
  }
  res.send("沒有商品 ID");
};

app.get("/", (req, res) => {
  res.send("Hello Express");
});
app.get("/product-a", checkProductMiddleware, (req, res) => {
  res.send(`商品 ID => ${req.query.productId}`);
});
app.get("/product-b", checkProductMiddleware, (req, res) => {
  res.send(`商品 ID => ${req.query.productId}`);
});

app.listen(8888, () => {
  console.log("伺服器開啟");
});
