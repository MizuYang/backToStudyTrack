import { TodoList } from "../model/todoListModel.js";
import { User } from "../model/userModel.js";
import { handleResponse } from "../service/handleResponse.js";

export const todoListController = {
  async getTodoLists(req, res) {
    const data = await TodoList.find().populate({
      path: "user",
      select: "username age",
    });

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "取得待辦清單成功",
      data,
    });
  },
  async getTodoList(req, res) {
    const { id } = req.params;

    if (!id) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦清單 ID",
      });
      return;
    }

    const data = await TodoList.findOne({ _id: id }).populate({
      path: "user",
      select: "username age",
    });

    if (!data) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到待辦清單",
      });
      return;
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "取得待辦清單成功",
      data,
    });
  },
  async createTodoLists(req, res) {
    0;
    const todos = req.body?.data;

    if (!todos || !Array.isArray(todos)) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供有效的待辦清單",
      });
      return;
    }

    if (todos.length === 0) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦清單不可為空陣列",
      });
      return;
    }

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      if (!todo.title || !todo.user) {
        handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: `第 ${i + 1} 筆待辦清單資料不完整，請提供 title 與 user`,
        });
        return;
      }
    }

    const newTodos = todos.map((todo) => {
      return {
        title: todo.title,
        isDone: todo.isDone || false,
        user: todo.user,
      };
    });

    const data = await TodoList.insertMany(newTodos);

    handleResponse({
      res,
      status: "success",
      statusCode: 201,
      message: "新增待辦清單成功",
      data,
    });
  },
  async createTodoList(req, res) {
    const { title, user } = req.body;

    if (!title || !user) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦事項標題與使用者 ID",
      });
      return;
    }

    const data = await TodoList.create({
      title,
      user,
    });

    handleResponse({
      res,
      status: "success",
      statusCode: 201,
      message: "新增待辦清單成功",
      data,
    });
  },
  async deleteTodoLists(req, res) {
    await TodoList.deleteMany({});

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "刪除所有待辦清單成功",
      data: [],
    });
  },
  async deleteTodoList(req, res) {
    const { id } = req.params;

    if (!id) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦清單 ID",
      });
      return;
    }

    const data = await TodoList.deleteOne({ _id: id });

    if (data.deletedCount === 0) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到待辦清單，無法刪除",
      });
      return;
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "刪除待辦清單成功",
    });
  },
  async updateTodoLists(req, res) {
    const todos = req.body?.data;

    if (!Array.isArray(todos)) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供有效的待辦清單資料",
      });
      return;
    }

    if (todos.length === 0) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "待辦清單資料不可為空陣列",
      });
      return;
    }

    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];

      if (!todo.id) {
        handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: `第 ${i + 1} 筆待辦清單資料不完整，請提供 id`,
        });
        return;
      }

      const hasValidTitle =
        typeof todo.title === "string" && todo.title.trim() !== "";
      const hasValidIsDone = typeof todo.isDone === "boolean";

      // title 或 isDone 至少其中一個欄位必須是有效的
      if (!hasValidTitle && !hasValidIsDone) {
        handleResponse({
          res,
          status: "fail",
          statusCode: 400,
          message: `第 ${i + 1} 筆待辦清單資料不完整，請至少提供 title 或 isDone，並確保資料型別正確`,
        });
        return;
      }
    }

    const newTodos = todos.map((todo) => {
      const setData = {};
      if (typeof todo?.title === "string" && todo?.title?.trim() !== "") {
        setData.title = todo.title;
      }
      if (typeof todo.isDone === "boolean") {
        setData.isDone = todo.isDone;
      }
      return {
        updateOne: {
          filter: {
            _id: todo.id,
          },
          update: {
            $set: setData,
          },
        },
      };
    });

    const data = await TodoList.bulkWrite(newTodos);

    if (data.matchedCount === 0) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到待辦清單，無法更新",
      });
      return;
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "更新待辦清單成功",
    });
  },
  async updateTodoList(req, res) {
    const { title, isDone } = req.body;
    const { id } = req.params;

    if (!id) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "請提供待辦清單 ID",
      });
      return;
    }

    const hasValidTitle = typeof title === "string" && title.trim() !== "";
    const hasValidIsDone = typeof isDone === "boolean";
    if (!hasValidTitle && !hasValidIsDone) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 400,
        message: "title, isDone 欄位至少需要一個有正確的格式",
      });
      return;
    }
    const updateData = {};
    if (hasValidTitle) updateData.title = title;
    if (hasValidIsDone) updateData.isDone = isDone;

    const data = await TodoList.updateOne(
      { _id: id },
      {
        $set: updateData,
      },
    );

    if (data.matchedCount === 0) {
      handleResponse({
        res,
        status: "fail",
        statusCode: 404,
        message: "找不到待辦清單，無法更新",
      });
      return;
    }

    handleResponse({
      res,
      status: "success",
      statusCode: 200,
      message: "更新待辦清單成功",
    });
  },
};
