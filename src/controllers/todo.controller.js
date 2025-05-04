const todoRepository = require("../repositories/todo.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createTodo = async (req, res) => {
    if (!req.body.title || !req.body.user_id) {
        return baseResponse(
            res,
            false,
            400,
            "Title and user_id are required",
            "null"
        );
    }
    try {
        const todo = await todoRepository.createTodo({
            title: req.body.title,
            deadline: req.body.deadline,
            user_id: req.body.user_id,
        });
        baseResponse(res, true, 201, "Todo created successfully", todo);
    } catch (error) {
        baseResponse(
            res,
            false,
            500,
            error.message || "Error creating todo",
            error
        );
    }
};

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await todoRepository.getAllTodos();
        baseResponse(res, true, 200, "Todos retrieved successfully", todos);
    } catch (error) {
        baseResponse(
            res,
            false,
            500,
            error.message || "Error getting todos",
            error
        );
    }
};

exports.deleteTodo = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(
            res,
            false,
            400,
            "ID is required",
            "null"
        );
    }
    try {
        const todo = await todoRepository.deleteTodo(req.params.id);
        if (!todo) {
            return baseResponse(res, false, 404, "Todo not found", "null");
        }
        baseResponse(res, true, 200, "Todo deleted successfully", todo);
    } catch (error) {
        baseResponse(
            res,
            false,
            500,
            error.message || "Error deleting todo",
            error
        );
    }
};

exports.updateTodo = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(
            res,
            false,
            400,
            "ID is required",
            "null"
        );
    }
    try {
        const todo = await todoRepository.updateTodo(req.params.id, {
            title: req.body.title,
            deadline: req.body.deadline,
            iscompleted: req.body.iscompleted,
        });
        if (!todo) {
            return baseResponse(res, false, 404, "Todo not found", "null");
        }
        baseResponse(res, true, 200, "Todo updated successfully", todo);
    } catch (error) {
        baseResponse(
            res,
            false,
            500,
            error.message || "Error updating todo",
            error
        );
    }
};

exports.updateCompleteTodo = async (req, res) => {
    if (!req.params.id) {
        return baseResponse(
            res,
            false,
            400,
            "ID is required",
            "null"
        );
    }
    try {
        const todo = await todoRepository.updateTodo(req.params.id, {
            iscompleted: req.body.iscompleted,
        });
        if (!todo) {
            return baseResponse(res, false, 404, "Todo not found", "null");
        }
        baseResponse(res, true, 200, "Todo updated successfully", todo);
    } catch (error) {
        baseResponse(
            res,
            false,
            500,
            error.message || "Error updating todo",
            error
        );
    }
}