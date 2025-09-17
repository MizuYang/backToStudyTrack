import express from "express";
import userRouter from "./0916-router.js";

const app = express();

app.use('/user', userRouter);

app.get("/", (req, res) => {
  res.send("router: /");
});

app.listen(8888, () => {
  console.log("localhost:8888");
});
