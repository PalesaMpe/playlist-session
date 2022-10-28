import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import ImageSlider from "./ImageSlider";

function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/addMe", {
        name: name,
        surname: surname,
        email: email,
        password: password,
      })
      .then(() => {
        console.log("successes");
      });
  };

  return (
    <div>
      <NavigationBar />
      <header className="App-header">
        <div className="container">
          <div className="form-base">
            <div className="row">
              <div className="col-lg-6">
                <form className="Auth-form">
                  <h1 className="title">Sign Up</h1>
                  <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                      type="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="form-control mt-1"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Surname</label>
                    <input
                      type="surname"
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                      className="form-control mt-1"
                      placeholder="Enter surname"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="form-control mt-1"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="form-control mt-1"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="loginBtn"
                      onClick={addUser}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <form className="Info-form m-2">
                  <ImageSlider
                    slides={["./music1.jpg", "./music1.jpg", "./music1.jpg"]}
                  />
                </form>
                <a className="prev">&#10094;</a>
                <a className="next">&#10095;</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Signup;
