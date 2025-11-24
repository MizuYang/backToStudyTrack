import express from "express";
import { todoListController } from "../controllers/todoList.js";

const router = express.Router();

// get
router.get("/todos", todoListController.getTodos);
router.get("/todo/:id", todoListController.getTodo);

// post
router.post("/todos", todoListController.createTodos);
router.post("/todo", todoListController.createTodo);

// delete
router.delete("/todos", todoListController.deleteTodos);
router.delete("/todo/:id", todoListController.deleteTodo);

// patch
router.patch("/todos", todoListController.updateTodos);
router.patch("/todo/:id", todoListController.updateTodo);

export default router;
