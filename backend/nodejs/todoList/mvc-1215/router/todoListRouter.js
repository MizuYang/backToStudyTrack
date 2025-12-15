import express from "express";
import { todoListController } from "../controllers/todoListController.js";
import { handleErrorAsync } from "../service/handleErrorAsync.js";

const router = express.Router();

router.get("/todos", handleErrorAsync(todoListController.getTodoLists));
router.get("/todo/:id", handleErrorAsync(todoListController.getTodoList));

router.post("/todos", handleErrorAsync(todoListController.createTodoLists));
router.post("/todo", handleErrorAsync(todoListController.createTodoList));

router.delete("/todos", handleErrorAsync(todoListController.deleteTodoLists));
router.delete("/todo/:id", handleErrorAsync(todoListController.deleteTodoList));

router.patch("/todos", handleErrorAsync(todoListController.updateTodoLists));
router.patch("/todo/:id", handleErrorAsync(todoListController.updateTodoList));

export default router;
