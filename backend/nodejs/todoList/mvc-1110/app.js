import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const BASE_URL = "/api/todoList";
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/todoList")
  .then(() => {
    console.log("mongoose 連線成功");
  })
  .catch(() => {
    console.log("mongoose 連線失敗");
  });

// 建立 schema
const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "項"],
    },
    isFinished: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "todoList",
  },
);
// 建立 model
const TodoList = mongoose.model("todoList", todoListSchema);

// 解析前端傳來的 JSON 資料
app.use(express.json());

// cors
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 建立路由

// get all
app.get(`${BASE_URL}`, async (req, res) => {
  const data = await TodoList.find();

  res.send({
    statusCode: 200,
    message: "成功",
    data,
  });
});

// get single
app.get(`${BASE_URL}/:id`, async (req, res) => {
  try {
    const { id = "" } = req.params;
    const data = await TodoList.findOne({ _id: id });

    res.send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

// post single
app.post(`${BASE_URL}`, async (req, res) => {
  const { title = "" } = req.body;

  if (typeof title !== "string" || title?.trim() === "") {
    return res.send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }

  const todo = { title: title.trim(), isFinished: false };
  const data = await TodoList.create(todo);

  res.send({
    statusCode: 200,
    message: "成功",
    data,
  });
});

// post multiple
app.post(`${BASE_URL}/multiple`, async (req, res) => {
  try {
    const todos = req.body.data;

    console.log("todos: ", todos);

    if (!Array.isArray(todos)) {
      res.send({
        statusCode: 400,
        message: "請傳入陣列格式",
        data: null,
      });
    }
    if (todos.length === 0) {
      res.send({
        statusCode: 400,
        message: "請傳入一筆以上的資料",
        data: null,
      });
    }
    const isValid = todos.every(
      (todo) => typeof todo.title === "string" && todo.title.trim() !== "",
    );
    if (!isValid) {
      res.send({
        statusCode: 400,
        message: "資料格式錯誤",
        data: null,
      });
    }

    const data = await TodoList.insertMany(todos);

    res.send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

app.listen(PORT, () => {
  console.log("伺服器連線成功: ", PORT);
});
