import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const CLIENT_ID = "db03438a98c64224a6e4861ebf1b226e";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      console.log("dsgfd");
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

  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-light">
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
      <header className="App-header">
        <form className="Auth-form right">
          <h1 className="title">Sign In</h1>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </form>

        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}
          >
            Register with Spotify
          </a>
        ) : (
          <div>
            <Link to="/Main">
              <button>Study</button>
            </Link>

            <button>Travel</button>
            <button>Exercise</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Signup;
