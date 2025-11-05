import express from "express";
import todoListController from "../controllers/todoList.js";

const router = express.Router();

// 取得全部待辦清單 (find)
router.get("/", async (req, res) => todoListController.getAllTodos(req, res));

// 取得單一待辦清單 (findOne)
router.get("/:id", async (req, res) => todoListController.getTodo(req, res));

// 新增一筆待辦清單 (create)
router.post("/", async (req, res) => todoListController.createTodo(req, res));

// 新增多筆待辦清單 (insertMany)
router.post("/multiple", async (req, res) =>
  todoListController.createTodos(req, res),
);

// 刪除全部待辦清單 (deleteMany)
router.delete("/", async (req, res) =>
  todoListController.deleteAllTodos(req, res),
);

// 刪除單筆待辦清單 (findOneAndDelete)
router.delete("/:id", async (req, res) =>
  todoListController.deleteTodo(req, res),
);

// 編輯多筆待辦清單 (Todo.bulkWrite)
router.patch("/multiple", async (req, res) =>
  todoListController.editTodos(req, res),
);

// 編輯單筆待辦清單 (findOneAndUpdate)
router.patch("/:id", async (req, res) => todoListController.editTodo(req, res));

export default router;
