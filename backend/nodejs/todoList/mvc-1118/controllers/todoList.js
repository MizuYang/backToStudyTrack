import TodoList from "../model/todoList.js";
import { successHandler } from "../service/success.js";
import { errorHandler } from "../service/error.js";

export const todoListController = {
  async getTodos(req, res) {
    try {
      const data = await TodoList.find();
      successHandler(req, res, 200, "取得待辦清單成功", data);
    } catch (err) {
      errorHandler(req, res, 500, "取得待辦清單失敗");
    }
  },
  async getTodo(req, res) {
    try {
      const { id = "" } = req.params;

      if (!id) {
        return errorHandler(req, res, 400, "缺少待辦清單 ID");
      }
      const data = await TodoList.findOne({ _id: id });
      if (!data) {
        return errorHandler(req, res, 404, "找不到該筆待辦清單");
      }
      successHandler(req, res, 200, "取得單一待辦清單成功", data);
    } catch (err) {
      errorHandler(req, res, 500, "取得單一待辦清單失敗");
    }
  },
  async createTodos(req, res) {
    try {
      const { data = [] } = req.body;

      if (!Array.isArray(data)) {
        errorHandler(req, res, 400, "待辦清單格式錯誤");
        return;
      }
      if (data.length === 0) {
        errorHandler(req, res, 400, "待辦清單不可為空");
        return;
      }
      const hasTitle = data.every((todo) => {
        console.log(
          todo.title,
          typeof todo.title === "string" && todo.title !== "",
        );
        return typeof todo.title === "string" && todo.title !== "";
      });
      if (!hasTitle) {
        errorHandler(req, res, 400, "待辦清單標題格式錯誤");
        return;
      }
      const todos = data.map((todo) => ({
        title: todo.title,
        isFinished: false,
      }));
      const newData = await TodoList.insertMany(todos);
      successHandler(req, res, 200, "新增多筆待辦清單成功", newData);
    } catch (err) {
      errorHandler(req, res, 500, "新增多筆待辦清單失敗");
    }
  },
  async createTodo(req, res) {
    try {
      const { title } = req.body;

      if (typeof title !== "string") {
        errorHandler(req, res, 400, "待辦清單標題格式錯誤");
        return;
      }
      if (title === "") {
        errorHandler(req, res, 400, "缺少待辦清單標題");
        return;
      }
      const newData = await TodoList.insertOne({
        title,
        isFinished: false,
      });
      successHandler(req, res, 200, "新增多筆待辦清單成功", newData);
    } catch (err) {
      errorHandler(req, res, 500, "新增待辦清單失敗");
    }
  },
  async deleteTodos(req, res) {
    try {
      const data = await TodoList.deleteMany({});
      successHandler(req, res, 200, "刪除多筆待辦清單成功", data);
    } catch (err) {
      errorHandler(req, res, 500, "刪除多筆待辦清單失敗");
    }
  },
  async deleteTodo(req, res) {
    try {
      const { id = "" } = req.params;

      if (!id) {
        errorHandler(req, res, 400, "缺少待辦清單 ID");
        return;
      }
      const data = await TodoList.deleteOne({ _id: id });
      if (!data.deletedCount) {
        errorHandler(req, res, 404, "找不到該筆待辦清單");
        return;
      }
      successHandler(req, res, 200, "刪除單一待辦清單成功", data);
    } catch (err) {
      errorHandler(req, res, 500, "刪除單一待辦清單失敗");
    }
  },
  async updateTodos(req, res) {
    try {
      const { data = [] } = req.body;
      if (!Array.isArray(data)) {
        errorHandler(req, res, 400, "待辦清單格式錯誤");
      }
      if (data.length === 0) {
        errorHandler(req, res, 400, "待辦清單格式錯誤");
      }
      const isIdValid = data.every((todo) => {
        return (
          todo.id !== "" && typeof todo.title === "string" && todo.title !== ""
        );
      });
      if (!isIdValid) {
        errorHandler(req, res, 400, "請提供待辦清單 ID");
      }
      const isTitleValid = data.every((todo) => {
        return typeof todo.title === "string" && todo.title !== "";
      });
      if (!isTitleValid) {
        errorHandler(req, res, 400, "請提供待辦清單標題");
      }
      const Todos = data.map((todo) => {
        return {
          updateMany: {
            filter: { _id: todo.id },
            update: { $set: { title: todo.title } },
          },
        };
      });
      const result = await TodoList.bulkWrite(Todos);
      successHandler(req, res, 200, "更新多筆待辦清單成功", result);
    } catch (err) {
      errorHandler(req, res, 500, "更新多筆待辦清單失敗");
    }
  },
  async updateTodo(req, res) {
    try {
      const { id = "" } = req.params;
      const { title = "" } = req.body;
      if (!id) {
        return errorHandler(req, res, 400, "缺少待辦清單 ID");
      }
      if (typeof title !== "string") {
        return errorHandler(req, res, 400, "待辦清單標題格式錯誤");
      }
      if (title === "") {
        return errorHandler(req, res, 400, "缺少待辦清單標題");
      }
      const data = await TodoList.updateOne({ _id: id }, { $set: { title } });
      successHandler(req, res, 200, "更新單一待辦清單成功", data);
    } catch (err) {
      errorHandler(req, res, 500, "更新單一待辦清單失敗");
    }
  },
};
