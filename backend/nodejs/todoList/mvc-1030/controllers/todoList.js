import TodoList from "../model/todoList.js";
import { handleSuccess } from "../service/handleSuccess.js";
import { handleError } from "../service/handleError.js";

const todoList = {
  async getAllTodos(req, res) {
    try {
      const data = await TodoList.find();
      handleSuccess(res, data, "取得待辦清單成功");
    } catch (err) {
      handleError(res, 400, "取得待辦清單失敗");
    }
  },
  async getTodo(req, res) {
    const { id } = req.params;

    try {
      const data = await TodoList.findOne({ _id: id });
      handleSuccess(res, data, "取得待辦清單成功");
    } catch (err) {
      handleError(res, 400, "取得待辦清單失敗");
    }
  },
  async createTodo(req, res) {
    try {
      const { title } = req.body;

      try {
        const newTodo = await TodoList.create({ title });
        handleSuccess(res, newTodo, "新增待辦清單成功");
      } catch (err) {
        handleError(res, 400, "新增待辦清單失敗");
      }
    } catch (err) {
      handleError(res, 400, "新增待辦清單失敗");
    }
  },
  async createTodos(req, res) {
    try {
      const { data } = req.body;

      // 處理非陣列情形
      if (!Array.isArray(data)) {
        handleError(res, 400, "新增待辦清單失敗，data 必須為陣列");
      }

      // 處理空陣列情形
      if (data.length === 0) {
        handleError(res, 400, "新增待辦清單失敗，data 不可為空陣列");
      }

      // 處理格式錯誤情形
      const isValid = data.every((item) => {
        const title = item?.title?.trim();
        return typeof title === "string" && title !== "";
      });

      if (!isValid) {
        handleError(res, 400, "新增待辦清單失敗，data 格式錯誤");
      }

      const todos = await TodoList.insertMany(data);

      handleSuccess(res, todos, "新增待辦清單成功");
    } catch (err) {
      handleError(res, 400, "新增待辦清單失敗");
    }
  },
  async deleteAllTodos(req, res) {
    try {
      await TodoList.deleteMany();
      handleSuccess(res, [], "刪除所有待辦清單成功");
    } catch (err) {
      handleError(res, 400, "刪除所有待辦清單失敗");
    }
  },
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoList.findOneAndDelete({ _id: id });
      handleSuccess(res, todo, "刪除待辦清單成功");
    } catch (err) {
      handleError(res, 400, "刪除待辦清單失敗");
    }
  },
  async editTodos(req, res) {
    try {
      const { data } = req.body;

      // 處理非陣列情形
      if (!Array.isArray(data)) {
        handleError(res, 400, "編輯多筆待辦清單失敗，data 必須為陣列");
      }

      // 處理空陣列情形
      if (data.length === 0) {
        handleError(res, 400, "編輯多筆待辦清單失敗，data 不可為空陣列");
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
        handleError(res, 400, "編輯多筆待辦清單失敗，data 格式錯誤");
      }

      const operations = data.map((item) => ({
        updateOne: {
          filter: { _id: item._id }, // 告訴 bulkWrite：用這個條件匹配資料
          update: { title: item.title }, // 告訴 bulkWrite：要更新的內容
        },
      }));

      // 一次性把所有操作送到資料庫
      const newTodos = await TodoList.bulkWrite(operations);
      handleSuccess(res, newTodos, "編輯多筆待辦清單成功");
    } catch (err) {
      handleError(res, 400, "編輯多筆待辦清單失敗");
    }
  },
  async editTodo(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      if (typeof title !== "string") {
        handleError(res, 400, "編輯待辦清單失敗，title 格式錯誤");
      }

      const newTodo = await TodoList.findOneAndUpdate(
        {
          _id: id,
        },
        {
          title,
        },
      );

      handleSuccess(res, newTodo, "更新待辦清單成功");
    } catch (err) {
      handleError(res, 400, "編輯待辦清單失敗");
    }
  },
};

export default todoList;
