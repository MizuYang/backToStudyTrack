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

  res.status(200).send({
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

    res.status(200).send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.status(400).send({
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
    return res.status(400).send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }

  const todo = { title: title.trim(), isFinished: false };
  const data = await TodoList.create(todo);

  res.status(200).send({
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
      res.status(400).send({
        statusCode: 400,
        message: "請傳入陣列格式",
        data: null,
      });
    }
    if (todos.length === 0) {
      res.status(400).send({
        statusCode: 400,
        message: "請傳入一筆以上的資料",
        data: null,
      });
    }
    const isValid = todos.every(
      (todo) => typeof todo.title === "string" && todo.title.trim() !== "",
    );
    if (!isValid) {
      res.status(400).send({
        statusCode: 400,
        message: "資料格式錯誤",
        data: null,
      });
    }

    const data = await TodoList.insertMany(todos);

    res.status(200).send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

// delete all
app.delete(`${BASE_URL}`, async (req, res) => {
  const data = await TodoList.deleteMany();

  try {
    res.status(200).send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

// delete single
app.delete(`${BASE_URL}/:id`, async (req, res) => {
  try {
    const { id = "" } = req.params;

    const data = await TodoList.deleteOne({ _id: id });

    if (data.deletedCount === 0) {
      return res.status(400).send({
        statusCode: 400,
        message: "刪除失敗，無此 ID",
        data: null,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

// patch multiple
app.patch(`${BASE_URL}/multiple`, async (req, res) => {
  try {
    const todos = req.body.data;

    if (!Array.isArray(todos)) {
      res.status(400).send({
        statusCode: 400,
        message: "請傳入陣列格式",
        data: null,
      });
    }

    if (todos.length === 0) {
      res.status(400).send({
        statusCode: 400,
        message: "請傳入一筆以上的資料",
        data: null,
      });
    }

    const updateCase = todos.map((todo) => {
      if (!todo._id) {
        res.status(400).send({
          statusCode: 400,
          message: "缺少待更新資料的 ID",
          data: null,
        });
      }
      if (typeof todo.title !== "string" || !todo.title.trim()) {
        res.status(400).send({
          statusCode: 400,
          message: "缺少待更新資料的標題或格式錯誤",
          data: null,
        });
      }

      return {
        updateOne: {
          filter: { _id: todo._id },
          update: { title: todo.title },
        },
      };
    });

    const data = await TodoList.bulkWrite(updateCase);

    res.status(200).send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

// patch single
app.patch(`${BASE_URL}/:id`, async (req, res) => {
  try {
    const { id = "" } = req.params;
    const { title = "" } = req.body;

    const data = await TodoList.updateOne({ _id: id }, { title });

    if (data.modifiedCount === 0) {
      res.status(400).send({
        statusCode: 400,
        message: "更新失敗，無此 ID 或資料無變更",
        data: null,
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "成功",
      data,
    });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: "失敗",
      data: null,
    });
  }
});

app.listen(PORT, () => {
  console.log("伺服器連線成功: ", PORT);
});
