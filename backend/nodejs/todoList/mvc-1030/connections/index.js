import mongoose from "mongoose";

/** [env]
 *  DATABASE: mongodb+srv://<db_account>:<db_password>@cluster0.xxx.mongodb.net/
 *  DATABASE_PASSWORD: 密碼
 */
// const DB = process.env.DATABASE.replace(
//   "<db_password>",
//   process.env.DATABASE_PASSWORD,
// );

mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("MongoDB 連線成功");
  })
  .catch((err) => {
    console.error("MongoDB 連線失敗", err);
  });
