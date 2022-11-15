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

  function checkExistingUser() {
    const promise = axios.get(`http://localhost:3001/user/${email}`);

    const dataPromise = promise.then((response) => response.data);

    return dataPromise;
  }

  const addUser = (e) => {
    e.preventDefault();

    if (
      !(
        name.length == 0 ||
        surname.length == 0 ||
        email.length == 0 ||
        surname.length == 0 ||
        password.length == 0
      )
    ) {
      checkExistingUser().then((data) => {
        var i = data.length;
        console.log("ii" + i);

        if (i == 0) {
          window.localStorage.removeItem("Count");
          axios
            .post("http://localhost:3001/addMe", {
              name: name,
              surname: surname,
              email: email,
              password: password,
            })
            .then(() => {
              alert("Account Saved");
              window.location.href = "/Login";
            });
        } else {
          alert("Account already exists");
        }
      });
    } else {
      alert("Please fill in all fields");
    }
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
                  <form>
                    <label>Name</label>
                    <input
                      type="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="form-control mt-1"
                      placeholder="Enter name"
                      required
                    />
                    <div className="form-group mt-3">
                      <label>Surname</label>
                      <input
                        type="surname"
                        onChange={(e) => {
                          setSurname(e.target.value);
                        }}
                        className="form-control mt-1"
                        placeholder="Enter surname"
                        required
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
                        required
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
                        required
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
