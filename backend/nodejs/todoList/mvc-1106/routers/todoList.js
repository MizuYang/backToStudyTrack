import express from "express";
import TodoList from "../model/todoList.js";
import { todoListController } from "../controllers/todoList.js";

const router = express.Router();

// 取得全部待辦清單 (find)
router.get("/", todoListController.getAllTodos);

// 取得單一待辦清單 (findOne)
router.get("/:id", todoListController.getTodo);

// 新增一筆待辦清單 (create)
router.post("/", todoListController.createTodo);

// 新增多筆待辦清單 (insertMany)
router.post("/multiple", todoListController.createTodos);

// 刪除全部待辦清單 (deleteMany)
router.delete("/", todoListController.deleteAllTodos);

// 刪除單筆待辦清單 (findOneAndDelete)
router.delete("/:id", todoListController.deleteTodo);

// 編輯多筆待辦清單 (TodoList.bulkWrite)
router.patch("/multiple", todoListController.editTodos);

// 編輯單筆待辦清單 (findOneAndUpdate)
router.patch("/:id", todoListController.editTodo);

export default router;
