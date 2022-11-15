import { useState, useEffect } from "react";
import axios from "axios";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { BiWindowOpen } from "react-icons/bi";

function AdminRegister() {
  const [adminID, setAdminID] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");

  var isActive = window.localStorage.getItem("adminActive");

  const addAdmin = async (e) => {
    e.preventDefault();
    var generatedPassword = "add" + Math.floor(Math.random() * 99999);

    if (window.confirm("Add Admin")) {
      window.localStorage.removeItem("Count");
      axios
        .post("http://localhost:3001/addAdmin", {
          adminID: adminID,
          name: name,
          surname: surname,
          idNumber: idNumber,
          email: email,
          cellphone: cellphone,
          password: password,
        })
        .then(() => {
          console.log("successes");
          window.location.href = "/Update";
        });
    }
  };
  return (
    <div className="AdminPage">
      <form className="UpdateDisplay">
        <label>AdminID</label>
        <input
          className="form-control mt-1"
          placeholder="Enter admin ID"
          onChange={(e) => {
            setAdminID(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="form-control mt-1"
          placeholder="Enter password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Name</label>
        <input
          className="form-control mt-1"
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <label>Surname</label>
        <input
          className="form-control mt-1"
          placeholder="Enter surname"
          onChange={(e) => {
            setSurname(e.target.value);
          }}
        />
        <label>ID</label>
        <input
          className="form-control mt-1"
          placeholder="Enter ID number"
          onChange={(e) => {
            setIdNumber(e.target.value);
          }}
        />
        <label>Cellphone</label>
        <input
          className="form-control mt-1"
          placeholder="Enter cellphone number"
          onChange={(e) => {
            setCellphone(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          className="form-control mt-1"
          placeholder="Enter email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="RegisterBtn" onClick={addAdmin}>
            Register Admin
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminRegister;
