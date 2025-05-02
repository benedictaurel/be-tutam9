const todoController = require("../controllers/todo.controller");
const express = require("express");
const router = express.Router();

router.post("/create", todoController.createTodo);
router.get("/getAll", todoController.getAllTodos);
router.delete("/delete/:id", todoController.deleteTodo);
router.put("/update/:id", todoController.updateTodo);

module.exports = router;