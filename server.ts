import express from "express";
import cors from "cors";
import { pool } from "./db";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/product", async (req, res) => {
  const rows = await pool.query(`select * from products ORDER BY id`);
  res.json(rows);
});
app.post("/product", async (req, res) => {
  const { name, price } = req.body;
  const isValid = name;
  if (!isValid) return res.status(400).send("Bad request");
  const row = await pool.query(
    `insert into products (name,price) values ('${name}', '${price}')`
  );
  return res.send("OK POST");
});
app.put("/product", async (req, res) => {
  const { id, name, price } = req.body;
  const isValid = name && price;
  if (!isValid) return res.status(400).send("Bad request");
  const row = await pool.query(
    `update products set name ='${name}' ,price='${price}' where id='${id}'`
  );
  return res.send("OK POST");
});
app.delete("/product", async (req, res) => {
  const { id } = req.query;
  await pool.query(`DELETE FROM products WHERE id=${Number(id)}`);

  return res.send("OK DELETE");
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
