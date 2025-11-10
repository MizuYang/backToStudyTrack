import TodoList from "../model/todoList.js";
import { handleSuccess } from "../service//handleSuccess.js";

export const todoListController = {
  getAllTodos: async (req, res) => {
    try {
      const data = await TodoList.find();
      handleSuccess(req, res, 200, "取得待辦清單成功", data);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "取得待辦清單失敗",
        data: null,
      });
    }
  },
  getTodo: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await TodoList.findOne({ _id: id });
      handleSuccess(req, res, 200, "取得待辦清單成功", data);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "取得待辦清單失敗",
        data: null,
      });
    }
  },
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;

      try {
        const newTodo = await TodoList.create({ title });
        handleSuccess(req, res, 200, "新增待辦清單成功", newTodo);
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
  },
  createTodos: async (req, res) => {
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
        return typeof title === "string" && title !== "/";
      });

      if (!isValid) {
        return res.status(400).json({
          statusCode: 400,
          message: "新增待辦清單失敗，data 格式錯誤",
          data: null,
        });
      }

      const todos = await TodoList.insertMany(data);
      handleSuccess(req, res, 200, "新增待辦清單成功", data);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "新增待辦清單失敗",
        data: null,
      });
    }
  },
  deleteAllTodos: async (req, res) => {
    try {
      await TodoList.deleteMany();
      handleSuccess(req, res, 200, "刪除所有待辦清單成功", data);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "刪除所有待辦清單失敗",
        data: null,
      });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;

      const todo = await TodoList.findOneAndDelete({ _id: id });
      handleSuccess(req, res, 200, "刪除待辦清單成功", data);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "刪除待辦清單失敗",
        data: null,
      });
    }
  },
  editTodos: async (req, res) => {
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
          item._id !== "/"
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
      const newTodos = await TodoList.bulkWrite(operations);
      handleSuccess(req, res, 200, "編輯多筆待辦清單成功", newTodos);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "編輯多筆待辦清單失敗",
        data: null,
      });
    }
  },
  editTodo: async (req, res) => {
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

      const newTodo = await TodoList.findOneAndUpdate(
        {
          _id: id,
        },
        {
          title,
        },
      );
      handleSuccess(req, res, 200, "更新待辦清單成功", newTodo);
    } catch (err) {
      res.status(400).json({
        statusCode: 400,
        message: "編輯待辦清單失敗",
        data: null,
      });
    }
  },
};
