const db = require("../database/pg.database");

exports.createTodo = async (todo) => {
    try {
        const res = await db.query(
        "INSERT INTO posts (title, deadline, user_id) VALUES ($1, $2, $3) RETURNING *",
        [todo.title, todo.deadline, todo.user_id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error creating todo", error);
    }
};

exports.getAllTodosByUserId = async (userId) => {
    try {
        const res = await db.query(
            "SELECT * FROM posts WHERE user_id = $1",
            [userId]
        );
        return res.rows;
    } catch (error) {
        console.error("Error getting todos by user_id", error);
        throw error;
    }
};

exports.deleteTodo = async (id) => {
    try {
        const res = await db.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error deleting todo", error);
    }
};

exports.updateTodo = async (id, todo) => {
    try {
        const res = await db.query(
            "UPDATE posts SET title = $1, deadline = $2, iscompleted = $3 WHERE id = $4 RETURNING *",
            [todo.title, todo.deadline, todo.iscompleted, id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error updating todo", error);
    }
};

exports.updateCompleteTodo = async (id, todo) => {
    try {
        const res = await db.query(
            "UPDATE posts SET iscompleted = $1 WHERE id = $2 RETURNING *",
            [todo.iscompleted, id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error updating todo completion", error);
    }
}
