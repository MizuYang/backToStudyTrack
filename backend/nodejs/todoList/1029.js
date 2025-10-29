import express from "express";
import mongoose from "mongoose";

// 建立資料庫連線
mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("MongoDB 連線成功");
  })
  .catch((err) => {
    console.error("MongoDB 連線失敗", err);
  });

const app = express();

// 解析前端傳來的 JSON 資料, 使後端能直接使用 req.body 取得資料
app.use(express.json());

// 建立 schema
const todoSchema = new mongoose.Schema(
  // 欄位設定
  {
    title: {
      type: String,
      required: [true, "標題必填！"],
    },
  },
  // schema 配置選項
  {
    versionKey: false,
    timestamps: true,
    collection: "todoList",
  },
);
// 建立 model
const Todo = mongoose.model("todoList", todoSchema);

// Todo.create({
//   title: `記得吃飯 - ${Math.random()}`,
// });

// 取得全部待辦清單 (find)
app.get("/todoList", async (req, res) => {
  try {
    const data = await Todo.find();

    res.status(200).json({
      statusCode: 200,
      message: "取得待辦清單成功",
      data,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "取得待辦清單失敗",
      data: null,
    });
  }
});

// 取得單一待辦清單 (findOne)
app.get("/todoList/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Todo.findOne({ _id: id });

    res.status(200).json({
      statusCode: 200,
      message: "取得待辦清單成功",
      data,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "取得待辦清單失敗",
      data: null,
    });
  }
});

// 新增一筆待辦清單 (create)
app.post("/todoList", async (req, res) => {
  try {
    const { title } = req.body;

    try {
      const newTodo = await Todo.create({ title });

      res.status(200).json({
        statusCode: 200,
        message: "新增待辦清單成功",
        data: newTodo,
      });
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "新增待辦清單失敗",
        data: null,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "新增待辦清單失敗",
      data: null,
    });
  }
});

// 新增多筆待辦清單 (insertMany)
app.post("/todoList", async (req, res) => {
  console.log("req.body: ", req.body);

  res.status(200).json({
    statusCode: 200,
    message: "新增待辦清單成功",
    data: newTodo,
  });

  // try {
  //   console.log("req.body.data: ", req.body);
  //   // const todos = await Todo.insertMany(req.body.data);
  //   console.log("req.body: ", req.body);

  //   // res.status(200).json({
  //   //   statusCode: 200,
  //   //   message: "新增待辦清單成功",
  //   //   data: todos,
  //   // });
  // } catch (err) {
  //   res.status(400).json({
  //     statusCode: 400,
  //     message: "新增待辦清單失敗",
  //     data: null,
  //   });
  // }
});

app.listen(8000, () => {
  console.log("伺服器連線成功");
});
