import express from "express";
import todoController from "../controllers/todoList.js";

const router = express.Router();

// get all
router.get("/", todoController.getTodo);

// get single
router.get("/:id", todoController.getTodos);

// post single
router.post("/", todoController.createTodo);

// post multiple
router.post("/multiple", todoController.createTodos);

// delete all
router.delete("/", todoController.deleteTodos);

// delete single
router.delete("/:id", todoController.deleteTodo);

// patch multiple
router.patch("/multiple", todoController.updateTodos);

// patch single
router.patch("/:id", todoController.updateTodo);

export default router;
