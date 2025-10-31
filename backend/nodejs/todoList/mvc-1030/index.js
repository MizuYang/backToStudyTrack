import express from "express";
import mongoose from "mongoose";

// 建立資料庫連線
import "./connections/index.js";

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
app.post("/todoList/multiple", async (req, res) => {
  try {
    const { data } = req.body;

    // 處理非陣列情形
    if (!Array.isArray(data)) {
      return res.status(400).json({
        statusCode: 400,
        message: "新增待辦清單失敗，data 必須為陣列",
        data: null,
      });
    }

    // 處理空陣列情形
    if (data.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "新增待辦清單失敗，data 不可為空陣列",
        data: null,
      });
    }

    // 處理格式錯誤情形
    const isValid = data.every((item) => {
      const title = item?.title?.trim();
      return typeof title === "string" && title !== "";
    });

    if (!isValid) {
      return res.status(400).json({
        statusCode: 400,
        message: "新增待辦清單失敗，data 格式錯誤",
        data: null,
      });
    }

    const todos = await Todo.insertMany(data);

    res.status(200).json({
      statusCode: 200,
      message: "新增待辦清單成功",
      data: todos,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "新增待辦清單失敗",
      data: null,
    });
  }
});

// 刪除全部待辦清單 (deleteMany)
app.delete("/todoList", async (req, res) => {
  try {
    await Todo.deleteMany();

    res.status(200).json({
      statusCode: 200,
      message: "刪除所有待辦清單成功",
      data: [],
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "刪除所有待辦清單失敗",
      data: null,
    });
  }
});

// 刪除單筆待辦清單 (findOneAndDelete)
app.delete("/todoList/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id });

    res.status(200).json({
      statusCode: 200,
      message: "刪除待辦清單成功",
      data: todo,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "刪除待辦清單失敗",
      data: null,
    });
  }
});

// 編輯多筆待辦清單 (Todo.bulkWrite)
app.patch("/todoList/multiple", async (req, res) => {
  try {
    const { data } = req.body;

    // 處理非陣列情形
    if (!Array.isArray(data)) {
      return res.status(400).json({
        statusCode: 400,
        message: "編輯多筆待辦清單失敗，data 必須為陣列",
        data: null,
      });
    }

    // 處理空陣列情形
    if (data.length === 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "編輯多筆待辦清單失敗，data 不可為空陣列",
        data: null,
      });
    }

    // 處理格式錯誤情形
    const isValid = data.every((item) => {
      return (
        typeof item._id === "string" &&
        typeof item.title === "string" &&
        item._id !== ""
      );
    });

    if (!isValid) {
      return res.status(400).json({
        statusCode: 400,
        message: "編輯多筆待辦清單失敗，data 格式錯誤",
        data: null,
      });
    }

    const operations = data.map((item) => ({
      updateOne: {
        filter: { _id: item._id }, // 告訴 bulkWrite：用這個條件匹配資料
        update: { title: item.title }, // 告訴 bulkWrite：要更新的內容
      },
    }));

    // 一次性把所有操作送到資料庫
    const newTodos = await Todo.bulkWrite(operations);

    res.status(200).json({
      statusCode: 200,
      message: "編輯多筆待辦清單成功",
      data: newTodos,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "編輯多筆待辦清單失敗",
      data: null,
    });
  }
});

// 編輯單筆待辦清單 (findOneAndUpdate)
app.patch("/todoList/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (typeof title !== "string") {
      return res.status(400).json({
        statusCode: 400,
        message: "編輯待辦清單失敗，title 格式錯誤",
        data: null,
      });
    }

    const newTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title,
      },
    );

    res.status(200).json({
      statusCode: 200,
      message: "更新待辦清單成功",
      data: newTodo,
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: "編輯待辦清單失敗",
      data: null,
    });
  }
});

app.listen(8000, () => {
  console.log("伺服器連線成功");
});
