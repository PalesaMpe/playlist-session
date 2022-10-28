const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

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

app.post("/addMe", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO new_table (Name, Surname, Email, Password) VALUES (?,?,?,?)";

  db.query(sqlInsert, [name, surname, email, password], (err, result) => {
    if (!err) res.send("values inserted");
    else console.log(err);
  });
});

app.post("/addSubscriber", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;

  const sqlInsert =
    "INSERT INTO subscribers (idSubscribers, Name, Surname, Email) VALUES (?,?,?,?)";

  db.query(sqlInsert, [id, name, surname, email], (err, result) => {
    if (!err) res.send("values inserted");
    else console.log(err);
  });
});

app.get("/users", (req, res) => {
  const sqlInsert = "SELECT * FROM new_table";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.listen(3001, () => console.log("server is running on port 3001"));
