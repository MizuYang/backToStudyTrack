import { TodoList } from "../model/todoListModel.js";
import { User } from "../model/userModel.js";
import { successHandler } from "../service/successHandler.js";
import { errorHandler } from "../service/errorHandler.js";

export const todoListController = {
  async getTodos(req, res) {
    // const data = await TodoList.find().populate("user"); // 撈出所有 user 欄位資料的簡寫
    const data = await TodoList.find().populate({
      path: "user",
      select: "username age email",
    });
    // res.cookie("mizuNo", "aa123456", {
    //   httpOnly: true, // 只能透過後端存取 cookie
    //   secure: false, // true 的話只能用在 https
    //   maxAge: 24 * 60 * 60 * 1000, // cookie 有效期限 1 天
    // });
    successHandler(req, res, 200, "取得待辦清單成功", data);
  },
  async getTodo(req, res) {
    const { id } = req.params;
    if (!id) {
      errorHandler(req, res, 400, "缺少 id 參數");
      return;
    }
    const data = await TodoList.findOne({ _id: id }).populate({
      path: "user",
      select: "username age email",
    });
    if (!data) {
      errorHandler(req, res, 404, "找不到該筆待辦清單");
      return;
    }
    successHandler(req, res, 200, "取得單一待辦清單成功", data);
  },
  async createTodos(req, res) {
    const { data = [] } = req.body;
    if (!Array.isArray(data)) {
      errorHandler(req, res, 400, "data 必須為陣列");
      return;
    }
    if (data.length === 0) {
      errorHandler(req, res, 400, "data 不可為空陣列");
      return;
    }
    const isTitleValid = data.every((todo) => {
      return typeof todo.title === "string" && todo.title.trim() !== "";
    });
    if (!isTitleValid) {
      errorHandler(req, res, 400, "每筆待辦清單的 title 必須為非空字串");
      return;
    }
    // 先取得所有使用者
    // 並使用第一位使用者的 _id 作為待辦清單的 user 欄位
    const users = await User.find();
    const userId = users.length > 0 ? users[0]._id : null;

    const newData = data.map((todo) => {
      return {
        title: todo.title,
        completed: false,
        user: userId,
      };
    });
    const result = await TodoList.insertMany(newData);
    successHandler(req, res, 200, "批次新增待辦清單成功", result);
  },
  async createTodo(req, res) {
    const { title = "" } = req.body;
    if (typeof title !== "string") {
      errorHandler(req, res, 400, "title 必須為字串");
      return;
    }
    if (title.trim() === "") {
      errorHandler(req, res, 400, "title 不可為空");
      return;
    }
    // 先取得所有使用者
    // 並使用第一位使用者的 _id 作為待辦清單的 user 欄位
    const users = await User.find();
    const userId = users.length > 0 ? users[0]._id : null;

    const newData = await TodoList.create({
      title,
      completed: false,
      user: userId,
    });
    successHandler(req, res, 200, "新增待辦清單成功", newData);
  },
  async deleteTodos(req, res) {
    const result = await TodoList.deleteMany({});
    successHandler(req, res, 200, "刪除所有待辦清單成功", result);
  },
  async deleteTodo(req, res) {
    const { id = "" } = req.params;
    if (!id) {
      errorHandler(req, res, 400, "缺少 id 參數");
      return;
    }
    const result = await TodoList.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      errorHandler(req, res, 404, "找不到該筆待辦清單");
      return;
    }
    successHandler(req, res, 200, "刪除單一待辦清單成功", result);
  },
  async updateTodos(req, res) {
    const { data = [] } = req.body;
    if (!Array.isArray(data)) {
      errorHandler(req, res, 400, "data 必須為陣列");
      return;
    }
    if (data.length === 0) {
      errorHandler(req, res, 400, "data 不可為空陣列");
      return;
    }

    const isIdValid = data.every((todo) => {
      return typeof todo.id === "string" && todo.id.trim() !== "";
    });
    if (!isIdValid) {
      errorHandler(req, res, 400, "每筆待辦清單的 id 必須為非空字串");
      return;
    }
    const isTitleValid = data.every((todo) => {
      return typeof todo.title === "string" && todo.title.trim() !== "";
    });
    if (!isTitleValid) {
      errorHandler(req, res, 400, "每筆待辦清單的 title 必須為非空字串");
      return;
    }

    const todos = data.map((todo) => {
      return {
        updateMany: {
          filter: { _id: todo.id },
          update: {
            $set: {
              title: todo.title,
              completed: todo.completed,
            },
          },
        },
      };
    });
    const result = await TodoList.bulkWrite(todos);
    successHandler(req, res, 200, "批次更新待辦清單成功", result);
  },
  async updateTodo(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    if (!id) {
      errorHandler(req, res, 400, "缺少 id 參數");
      return;
    }
    if (typeof title !== "string") {
      errorHandler(req, res, 400, "title 必須為字串");
      return;
    }
    if (title.trim() === "") {
      errorHandler(req, res, 400, "title 不可為空");
      return;
    }
    const result = await TodoList.updateOne(
      { _id: id },
      {
        $set: {
          title,
        },
      },
    );
    successHandler(req, res, 200, "更新單一待辦清單成功", result);
  },
};
