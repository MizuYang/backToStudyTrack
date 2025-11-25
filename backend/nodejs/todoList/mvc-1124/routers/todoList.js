import express from "express";
import { todoListController } from "../controllers/todoList.js";
import { handleErrorAsync } from "../service/handleErrorAsync.js";

const router = express.Router();

// get
router.get("/todos", handleErrorAsync(todoListController.getTodos));
router.get("/todo/:id", handleErrorAsync(todoListController.getTodo));

// post
router.post("/todos", handleErrorAsync(todoListController.createTodos));
router.post("/todo", handleErrorAsync(todoListController.createTodo));

// delete
router.delete("/todos", handleErrorAsync(todoListController.deleteTodos));
router.delete("/todo/:id", handleErrorAsync(todoListController.deleteTodo));

// patch
router.patch("/todos", handleErrorAsync(todoListController.updateTodos));
router.patch("/todo/:id", handleErrorAsync(todoListController.updateTodo));

export default router;
