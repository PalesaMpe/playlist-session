const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "s223147087@mandela.ac.za",
    pass: "password",
  },
});

const mailOptions = {
  from: "s223147087@mandela.ac.za",
  to: "mpalesa.mpe@gmail.com",
  subject: "How to test thius",
  text: "efwgdged",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
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

app.post("/addUpdate", (req, res) => {
  console.log(req.body);
  const updateID = req.body.updateID;
  const updateText = req.body.updateText;
  const dateLogged = req.body.dateLogged;

  const sqlInsert =
    "INSERT INTO updates (updateID, updateText, dateLogged) VALUES (?,?,?)";

  db.query(sqlInsert, [updateID, updateText, dateLogged], (err, result) => {
    if (!err) res.send("values inserted");
    else console.log(err);
  });
});

app.post("/addEnquiry", (req, res) => {
  console.log(req.body);

  const enquiryID = req.body.enquiryID;
  const enquiry = req.body.enquiry;
  const userID = req.body.userID;
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const dateSubmitted = req.body.dateSubmitted;

  const sqlInsert =
    "INSERT INTO enquiries (EnquiryID, UserID, Name, Surname, Email, Enquiry, DateSubmitted) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sqlInsert,
    [enquiryID, userID, name, surname, email, enquiry, dateSubmitted],
    (err, result) => {
      if (!err) res.send("values inserted");
      else console.log(err);
    }
  );
});

app.get("/users", (req, res) => {
  const sqlInsert = "SELECT * FROM new_table";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/subscribers", (req, res) => {
  const sqlInsert = "SELECT * FROM subscribers";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/enquiries", (req, res) => {
  const sqlInsert = "SELECT * FROM enquiries";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/updates", (req, res) => {
  const sqlInsert = "SELECT * FROM updates";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.listen(3001, () => console.log("server is running on port 3001"));
