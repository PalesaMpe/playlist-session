const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "dbhandler",
});

db.connect((err) => {
  if (!err) console.log("success");
  else console.log("failed");
});

app.listen(3000, () => console.log("server is running on port 3000"));

app.get("/users", (req, res) => {
  const sqlInsert = "INSERT INTO new_table (Name) VALUES ('meee')";
  db.query(sqlInsert, (err, rows, fields) => {
    if (!err) console.log(rows);
    else console.log(err);
  });
});
