import mongoose from "mongoose";
import handleResponse from "../service/handleResponse.js";
import TodoList from "../model/todoListModel.js";
import "../model/userModel.js";

const TodoListControllers = {
  async getAllTodos(req, res) {
    const data = await TodoList.find().populate({
      path: "user",
      select: "username age email address",
    });

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "取得所有待辦事項成功",
      data,
    });
  },
  async getTodo(req, res) {
    const { id = "" } = req.params;

    if (!id) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦事項 ID",
        data: null,
      });
    }

    // 檢查 id 格式是否正確
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦事項 ID 格式錯誤",
        data: null,
      });
    }

    const data = await TodoList.findById({ _id: id }).populate({
      path: "user",
      select: "username age email address",
    });

    if (!data) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到該筆待辦事項",
        data: null,
      });
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "取得單一待辦事項成功",
      data,
    });
  },
  async createTodos(req, res) {
    const { data = [] } = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供正確格式的待辦事項資料",
        data: null,
      });
    }

    // 檢查每筆待辦事項是否有 title
    for (let i = 0; i < data.length; i++) {
      const title = data[i].title || "";

      if (!title.trim()) {
        return handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: "每筆待辦事項都需提供標題",
          data: null,
        });
      }
    }

    const todos = await TodoList.insertMany(data);

    handleResponse({
      res,
      status: "success",
      statusCode: 201,
      message: "新增多筆待辦事項成功",
      data: todos,
    });
  },
  async createTodo(req, res) {
    const { title = "", isDone = false } = req.body;

    if (!title.trim()) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦事項標題不可為空",
        data: null,
      });
    }

    const data = await TodoList.create({
      title,
      isDone,
    });

    handleResponse({
      res,
      status: "success",
      statusCode: 201,
      message: "新增待辦事項成功",
      data,
    });
  },
  async deleteTodos(req, res) {
    const data = await TodoList.deleteMany();

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "刪除多筆待辦事項成功",
      data: [],
    });
  },
  async deleteTodo(req, res) {
    const { id = "" } = req.params;

    if (!id) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦事項 ID",
        data: null,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦事項 ID 格式錯誤",
        data: null,
      });
    }

    const data = await TodoList.deleteOne({ _id: id });

    if (data.deletedCount === 0) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到該筆待辦事項，無法刪除",
        data: null,
      });
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "刪除單筆待辦事項成功",
      data: [],
    });
  },
  async updateTodos(req, res) {
    const { data = [] } = req.body;

    const updTodos = data.map((todo) => {
      // 檢查 id 格式是否正確
      if (!mongoose.Types.ObjectId.isValid(todo.id)) {
        handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: "待辦事項 ID 格式錯誤，請確認後再更新",
          data: null,
        });
      }

      // 檢查 title 格式是否正確
      if (todo.title && typeof todo.title !== "string") {
        handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: "待辦事項格式錯誤，請確認後再更新",
          data: null,
        });
      }

      // title, isDone 不可同時為空
      if (
        todo?.title &&
        todo?.title?.trim() === "" &&
        typeof todo?.isDone !== "boolean"
      ) {
        handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: "title, isDone 不可同時為空，請確認後再更新",
          data: null,
        });
      }

      return {
        updateOne: {
          filter: { _id: todo.id },
          update: {
            $set: {
              title: todo?.title,
              isDone: todo?.isDone,
            },
          },
        },
      };
    });

    const todos = await TodoList.bulkWrite(updTodos);

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: `更新${todos.modifiedCount}筆待辦事項成功`,
    });
  },
  async updateTodo(req, res) {
    const { id, title, isDone } = req.body;

    if (!id) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦事項 ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦事項 ID 格式錯誤",
      });
    }

    if (title && typeof title !== "string") {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦事項格式錯誤，請確認後再更新",
      });
    }

    if (title?.trim() === "" && typeof isDone !== "boolean") {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "title, isDone 不可同時為空，請確認後再更新",
      });
    }

    const data = await TodoList.updateOne(
      { _id: id },
      {
        $set: {
          title,
          isDone,
        },
      },
    );

    if (data.matchedCount === 0) {
      return handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到該筆待辦事項，無法更新",
      });
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: `更新單筆待辦事項成功`,
    });
  },
};

export default TodoListControllers;
