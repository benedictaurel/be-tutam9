require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

const query = async (text, params) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(text, params);
    return result;
  } catch (err) {
    console.error("Database Query Error:", err);
    throw err;
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  pool,
  query,
};
