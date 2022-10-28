import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";

function Main() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [profile, setProfile] = useState("");

  var currentPage = "/Main";
  window.localStorage.setItem("currentPage", currentPage);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    console.log(window.localStorage.getItem("user"));
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

  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          PLAYLIST SESSION
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Study <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Travel
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <div className="container">
        <div className="test1">
          <div className="row">
            <div className="col-lg-4">
              <form>
                <Link to="/Study">
                  <button className="activityBtn">Study</button>
                </Link>
              </form>
              <img
                className="activityBackground"
                src={require("./music2.jpg")}
              />
            </div>
            <div className="col-lg-4">
              <form>
                <Link to="/Travel">
                  <button className="activityBtn">Travel</button>
                </Link>
              </form>
              <img
                className="activityBackground"
                src={require("./music2.jpg")}
              />
            </div>
            <div className="col-lg-4">
              <form>
                <Link to="/Exercise">
                  <button className="activityBtn">Exercise</button>
                </Link>
              </form>
              <img
                className="activityBackground"
                src={require("./music2.jpg")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
