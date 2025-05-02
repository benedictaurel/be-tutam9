const db = require("../database/pg.database");

exports.registerUser = async (user) => {
  try {
    const res = await db.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [user.email, user.password, user.name]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating user", error);
  }
};

exports.loginUser = async (user) => {
  try {
    const res = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [user.email, user.password]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error logging in user", error);
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return res.rows[0];
  } catch (error) {
    console.error("Error getting user", error);
  }
};