// db.js
import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  user: "postgres",
  password: "12345678",
  host: "localhost",
  port: 5432,
  database: "task_db",
});

export default pool;
