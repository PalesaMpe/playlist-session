import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlider from "../ImageSlider";
import { Link } from "react-router-dom";

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");

  window.localStorage.removeItem("role");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("adminActive");
  document.body.style.background = `grey`;

  const getAdmins = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:3001/admins").then((response) => {
      console.log(response.data);
      setAdmins(response.data);
    });
  };

  const checkAdmin = async (e) => {
    e.preventDefault();
    var isValid = false;
    for (var i = 0; i <= admins.length - 1; i++) {
      if (admin == admins[i].adminID && password == admins[i].Password) {
        isValid = true;
        window.localStorage.setItem("currentAdmin", admins[i].adminID);
        if (admin[0] == "H") {
          window.localStorage.setItem("role", "Head");
        }
        window.localStorage.setItem("adminActive", true);
        window.location.href = "http://localhost:3000/Update";
        break;
      } else {
        isValid = false;
      }
    }

    if (isValid == false) {
      alert("Invalid details");
    }
  };

  return (
    <div className="AdminPage">
      <nav class="navbar navbar-expand-sm">
        <a class="navbar-brand" href="#">
          <h1>PLAYLIST SESSION</h1>
        </a>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                <h5>HOME</h5>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                <h5>ABOUT</h5>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                <h5>CONTACT</h5>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <form className="Auth-form">
              <h1 className="title">Admin</h1>
              <div className="form-group mt-3">
                <label>Admin ID</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Admin ID"
                  onChange={(e) => {
                    setAdmin(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  id="lg"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="loginBtn" onClick={getAdmins}>
                  Submit
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={checkAdmin}
                >
                  Check
                </button>

                {admins.map((val, key) => {
                  return <div>{val.Email}</div>;
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
