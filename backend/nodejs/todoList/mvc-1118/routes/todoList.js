import express from "express";
import { todoListController } from "../controllers/todoList.js";

const router = express.Router();

// get
router.get("/todos", (req, res) => todoListController.getTodos(req, res));
router.get("/todo/:id", (req, res) => todoListController.getTodo(req, res));

// post
router.post("/todo", (req, res) => todoListController.createTodo(req, res));
router.post("/todos", (req, res) => todoListController.createTodos(req, res));

// delete
router.delete("/todos", (req, res) => todoListController.deleteTodos(req, res));
router.delete("/todo/:id", (req, res) =>
  todoListController.deleteTodo(req, res),
);

// patch
router.patch("/todos", (req, res) => todoListController.updateTodos(req, res));
router.patch("/todo/:id", (req, res) =>
  todoListController.updateTodo(req, res),
);

export default router;
