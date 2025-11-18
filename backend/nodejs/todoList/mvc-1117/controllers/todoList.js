import TodoList from "../model/todoList.js";
import { successHandler } from "../service/success.js";
import { errorHandler } from "../service/error.js";

const todoController = {
  async getTodo(req, res) {
    const data = await TodoList.find();
    successHandler(req, res, 200, "成功", data);
  },
  async getTodos(req, res) {
    try {
      const { id = "" } = req.params;
      const data = await TodoList.findOne({ _id: id });
      successHandler(req, res, 200, "成功", data);
    } catch (err) {
      errorHandler(req, res, 400, "失敗");
    }
  },
  async createTodo(req, res) {
    const { title = "" } = req.body;

    if (typeof title !== "string" || title?.trim() === "") {
      errorHandler(req, res, 400, "失敗");
    }
    const todo = { title: title.trim(), isFinished: false };
    const data = await TodoList.create(todo);
    successHandler(req, res, 200, "成功", data);
  },
  async createTodos(req, res) {
    try {
      const todos = req.body.data;

      if (!Array.isArray(todos)) {
        errorHandler(req, res, 400, "請傳入陣列格式");
      }
      if (todos.length === 0) {
        errorHandler(req, res, 400, "請傳入一筆以上的資料");
      }
      const isValid = todos.every(
        (todo) => typeof todo.title === "string" && todo.title.trim() !== "",
      );
      if (!isValid) {
        errorHandler(req, res, 400, "資料格式錯誤");
      }
      const data = await TodoList.insertMany(todos);
      successHandler(req, res, 200, "成功", data);
    } catch (err) {
      errorHandler(req, res, 400, "失敗");
    }
  },
  async deleteTodo(req, res) {
    try {
      const { id = "" } = req.params;
      const data = await TodoList.deleteOne({ _id: id });

      if (data.deletedCount === 0) {
        errorHandler(req, res, 400, "刪除失敗，無此 ID");
      }
      successHandler(req, res, 200, "成功", data);
    } catch (err) {
      errorHandler(req, res, 400, "失敗");
    }
  },
  async deleteTodos(req, res) {
    const data = await TodoList.deleteMany();

    try {
      successHandler(req, res, 200, "成功", data);
    } catch (err) {
      errorHandler(req, res, 400, "失敗");
    }
  },
  async updateTodo(req, res) {
    try {
      const { id = "" } = req.params;
      const { title = "" } = req.body;
      const data = await TodoList.updateOne({ _id: id }, { title });

      if (data.modifiedCount === 0) {
        errorHandler(req, res, 400, "更新失敗，無此 ID 或資料無變更");
      }
      successHandler(req, res, 200, "成功", data);
    } catch (err) {
      errorHandler(req, res, 400, "失敗");
    }
  },
  async updateTodos(req, res) {
    try {
      const todos = req.body.data;

      if (!Array.isArray(todos)) {
        errorHandler(req, res, 400, "請傳入陣列格式");
      }

      if (todos.length === 0) {
        errorHandler(req, res, 400, "請傳入一筆以上的資料");
      }

      const updateCase = todos.map((todo) => {
        if (!todo._id) {
          errorHandler(req, res, 400, "缺少待更新資料的 ID");
        }
        if (typeof todo.title !== "string" || !todo.title.trim()) {
          errorHandler(req, res, 400, "缺少待更新資料的標題或格式錯誤");
        }

        return {
          updateOne: {
            filter: { _id: todo._id },
            update: { title: todo.title },
          },
        };
      });
      const data = await TodoList.bulkWrite(updateCase);
      successHandler(req, res, 200, "成功", data);
    } catch (err) {
      console.error(err);
      errorHandler(req, res, 400, "失敗");
    }
  },
};

export default todoController;
