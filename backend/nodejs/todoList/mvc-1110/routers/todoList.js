import express from "express";
import { todoListController } from "../controllers/todoList.js";

const router = express.Router();

// get all
router.get("/", todoListController.getTodos);

// get single
router.get("/:id", todoListController.getTodo);

// post single
router.post("/", todoListController.createTodo);

// post multiple
router.post("/multiple", todoListController.createTodos);

// delete all
router.delete("/", todoListController.deleteTodos);

// delete single
router.delete("/:id", todoListController.deleteTodo);

// patch multiple
router.patch("/multiple", todoListController.updateTodos);

// patch single
router.patch("/:id", todoListController.updateTodo);

export default router;
