import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

const todos = [
  {
    id: uuidv4(),
    title: "完成 mongoose 練習",
  },
  {
    id: uuidv4(),
    title: "完成 todoList 練習",
  },
  {
    id: uuidv4(),
    title: "完成 mongoDB 練習",
  },
  {
    id: uuidv4(),
    title: "完成 MVC 架構練習",
  },
  {
    id: uuidv4(),
    title: "完成 Router 拆分練習",
  },
  {
    id: uuidv4(),
    title: "完成 Express 練習",
  },
];

// 解析前端傳來的 JSON 資料, 使後端能直接使用 req.body 取得資料
app.use(express.json());

// 取得所有待辦事項
app.get("/todoList", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    data: todos,
    message: "取得所有待辦事項成功",
  });
});

// 取得單一待辦事項
app.get("/todoList/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      data: {},
      message: "缺少參數 id",
    });
  }

  try {
    const todo = todos.find((item) => item.id === Number(id));

    if (todo.id) {
      return res.status(200).json({
        statusCode: 200,
        data: todo,
        message: "取得待辦事項成功",
      });
    }

    res.status(400).json({
      statusCode: 400,
      data: {},
      message: "取得失敗，查無此待辦事項",
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      data: {},
      message: "取得失敗，查無此待辦事項",
    });
  }
});

// 新增待辦事項
app.post("/todoList", (req, res) => {
  try {
    const data = {
      id: uuidv4(),
      title: req.body?.title,
    };
    if (!data.title.trim() || !req.body) {
      return res.status(400).json({
        statusCode: 400,
        data: {},
        message: "新增失敗，沒有傳送資料或 title 為空",
      });
    }
    todos.unshift(data);

    console.log("todos: ", todos);
    res.status(200).json({
      statusCode: 200,
      data,
      message: "新增待辦事項成功",
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      data: {},
      message: "新增失敗，沒有傳送資料或 title 為空",
    });
  }
});

// 編輯待辦事項
app.patch("/todoList/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body || !id || !req.body.title.trim()) {
      return res.status(400).json({
        statusCode: 400,
        data: {},
        message: "編輯失敗，沒有傳送資料或 title 為空",
      });
    }

    const todoIndex = todos.findIndex((item) => item.id === id);
    if (todoIndex === -1) {
      return res.status(400).json({
        statusCode: 400,
        data: {},
        message: "編輯失敗，查無此待辦事項",
      });
    }

    todos[todoIndex].title = req.body.title;

    res.status(200).json({
      statusCode: 200,
      data: todos[todoIndex],
      message: "編輯待辦事項成功",
    });
  } catch (err) {
    return res.status(400).json({
      statusCode: 400,
      data: {},
      message: "編輯失敗，沒有傳送資料或 title 為空",
    });
  }
});

app.listen(8080, () => {
  console.log("伺服器連線成功");
});
