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
    "INSERT INTO users (Name, Surname, Email, Password) VALUES (?,?,?,?)";

  db.query(sqlInsert, [name, surname, email, password], (err, result) => {
    if (!err) res.send("values inserted");
    else console.log(err);
  });
});

app.get("/users", (req, res) => {
  const sqlSelect = "SELECT * FROM users";

  db.query(sqlSelect, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/user/:email", (req, res) => {
  const userEmail = req.params.email;

  const sqlSelect = "SELECT * FROM users WHERE Email = ?";

  db.query(sqlSelect, userEmail, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/user1/:id", (req, res) => {
  const userID = req.params.id;

  const sqlSelect = "SELECT * FROM users WHERE id = ?";

  db.query(sqlSelect, userID, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.delete("/deleteUser/:email", (req, res) => {
  const userEmail = req.params.email;

  db.query("DELETE FROM users WHERE Email = ?", userEmail, (err, result) => {
    if (!err) res.send("Deleted");
    else console.log(err);
  });
});

app.put("/updateUser", (req, res) => {
  const userID = req.body.userID;
  const userName = req.body.userName;
  const userSurname = req.body.userSurname;
  const userEmail = req.body.userEmail;

  db.query(
    "UPDATE users SET Name = ?, Surname = ?, Email = ? WHERE id = ?",
    userName,
    userSurname,
    userEmail,
    userID,
    (err, result) => {
      if (!err) res.send("Deleted");
      else console.log(err);
    }
  );
});

app.post("/addAdmin", (req, res) => {
  console.log(req.body);
  const adminID = req.body.adminID;
  const name = req.body.name;
  const surname = req.body.surname;
  const idNumber = req.body.idNumber;
  const email = req.body.email;
  const cellphone = req.body.cellphone;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO admin (adminID, Name, Surname, IDNumber, Email, Cellphone, Password) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sqlInsert,
    [adminID, name, surname, idNumber, email, cellphone, password],
    (err, result) => {
      if (!err) res.send("values inserted");
      else console.log(err);
    }
  );
});

app.get("/admins", (req, res) => {
  const sqlSelect = "SELECT * FROM admin";

  db.query(sqlSelect, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/admin/:id", (req, res) => {
  const adminID = req.params.id;

  const sqlSelect = "SELECT * FROM admin WHERE adminID = ?";

  db.query(sqlSelect, adminID, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.put("/updateAdmin", (req, res) => {
  const adminID = req.body.adminID;
  const name = req.body.name;
  const surname = req.body.surname;
  const idNumber = req.body.idNumber;
  const email = req.body.email;
  const cellphone = req.body.cellphone;
  const password = req.body.password;

  db.query(
    "UPDATE admin SET Name = ?, Surname = ?, IDNumber = ?, Email = ?, Cellphone = ?, Password = ? WHERE adminID = ?",
    name,
    surname,
    idNumber,
    email,
    cellphone,
    password,
    adminID,
    (err, result) => {
      if (!err) res.send("updated");
      else console.log(err);
    }
  );
});

app.delete("/deleteAdmin/:id", (req, res) => {
  const adminID = req.params.id;

  db.query("DELETE FROM admin WHERE adminID = ?", adminID, (err, result) => {
    if (!err) res.send("Deleted");
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

app.get("/enquiries", (req, res) => {
  const sqlSelect = "SELECT * FROM enquiries";

  db.query(sqlSelect, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.get("/enquiry/:id", (req, res) => {
  const enquiryID = req.params.id;

  const sqlInsert = "SELECT * FROM enquiries WHERE EnquiryID = ?";

  db.query(sqlInsert, enquiryID, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});

app.delete("/deleteEnquiry/:id", (req, res) => {
  const enquiryID = req.params.id;

  db.query(
    "DELETE FROM enquiries WHERE EnquiryID = ?",
    enquiryID,
    (err, result) => {
      if (!err) res.send("Deleted");
      else console.log(err);
    }
  );
});

app.get("/subscribers", (req, res) => {
  const sqlInsert = "SELECT * FROM subscribers";

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

app.get("/reviews", (req, res) => {
  const sqlInsert = "SELECT * FROM reviews";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});
app.get("/reviewsDESC", (req, res) => {
  const sqlInsert = "SELECT * FROM reviews ORDER BY rating DESC";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});
app.get("/reviewsASC", (req, res) => {
  const sqlInsert = "SELECT * FROM reviews ORDER BY rating ASC";

  db.query(sqlInsert, (err, result) => {
    if (!err) res.send(result);
    else console.log(err);
  });
});
app.post("/addReview", (req, res) => {
  const reviewID = req.body.reviewID;
  const userID = req.body.userID;
  const rating = req.body.rating;
  const reviewText = req.body.reviewText;

  const sqlInsert =
    "INSERT INTO reviews (reviewID, UserID, rating, reviewText) VALUES (?,?,?,?)";

  db.query(sqlInsert, [reviewID, userID, rating, reviewText], (err, result) => {
    if (!err) res.send("values inserted");
    else console.log(err);
  });
});

app.listen(3001, () => console.log("server is running on port 3001"));
