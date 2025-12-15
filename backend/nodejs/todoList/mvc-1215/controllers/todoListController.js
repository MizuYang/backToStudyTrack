import { TodoList } from "../model/todoListModel.js";
import { User } from "../model/userModel.js";

export const todoListController = {
  async getTodoLists(req, res) {
    const data = await TodoList.find().populate({
      path: "user",
      select: "username age",
    });

    res.json({
      status: "success",
      statusCode: 200,
      message: "取得待辦清單成功",
      data,
    });
  },
  async getTodoList(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
  async createTodoLists(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
  async createTodoList(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
  async deleteTodoLists(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
  async deleteTodoList(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
  async updateTodoLists(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
  async updateTodoList(req, res) {
    console.log("取得待辦清單");
    res.json({
      status: "success",
    });
  },
};
