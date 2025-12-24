import express from "express";
import TodoListControllers from "../controllers/todoListController.js";
import handleErrorAsync from "../service/handleErrorAsync.js";

const router = express.Router();

router.get("/todos", handleErrorAsync(TodoListControllers.getAllTodos));
router.get("/todo/:id", handleErrorAsync(TodoListControllers.getTodo));

router.post("/todos", handleErrorAsync(TodoListControllers.createTodos));
router.post("/todo", handleErrorAsync(TodoListControllers.createTodo));

router.delete("/todos", handleErrorAsync(TodoListControllers.deleteTodos));
router.delete("/todo/:id", handleErrorAsync(TodoListControllers.deleteTodo));

router.patch("/todos", handleErrorAsync(TodoListControllers.updateTodos));
router.patch("/todo", handleErrorAsync(TodoListControllers.updateTodo));

export default router;
