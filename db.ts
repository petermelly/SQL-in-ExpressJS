import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "peter",
  database: "products_db",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
