import { useEffect, useState } from "react";
import axios from "axios";
import ImageSlider from "./ImageSlider";

function Login() {
  const CLIENT_ID = "db03438a98c64224a6e4861ebf1b226e";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const getUser = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:3001/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };

  const checkUser = async (e) => {
    e.preventDefault();
    for (var i = 0; i <= users.length - 1; i++) {
      if (email == users[i].Email && password == users[i].Password) {
        console.log("VALID");
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            id: users[i].id,
            name: users[i].Name,
            surname: users[i].Surname,
            email: users[i].Email,
          })
        );
        window.location.href = "http://localhost:3000/main";
        break;
      }
    }
  };

  return (
    <div>
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

      <div className="container con2">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-base p-3">
              <form className="Auth-form">
                <h1 className="title">Hello!</h1>
                <p className="greeting">We are happy to see you again!</p>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                  <button type="submit" className="loginBtn" onClick={getUser}>
                    Submit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={checkUser}
                  >
                    Check
                  </button>

                  {users.map((val, key) => {
                    return <div>{val.Email}</div>;
                  })}
                </div>
                <p className="forgot-password text-right mt-2">
                  Forgot <a href="#">password?</a>
                </p>
                <p className="text-right mt-2">
                  Need an account?
                  <a href="/Signup">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
