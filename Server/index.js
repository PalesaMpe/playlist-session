const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Pale@Mpe76",
  database: "db_handler",
});
app.get("/", (req, res) => {
  const sqlInsert = "INSERT INTO users1 (id, name) VALUES (2,'Palesa');";
  db.query(sqlInsert, (err, result) => {
    res.send("hello world");
  });
});
app.listen(3001, () => {
  console.log("Running on port 3001");
});
