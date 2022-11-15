import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";
import Header from "./Header";
import image from "../images/background5.jpg";

function Main() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [profile, setProfile] = useState("");

  var currentPage = "/Main";
  var isActive = window.localStorage.getItem("Active");

  window.localStorage.setItem("currentPage", currentPage);

  useEffect(() => {
    console.log(isActive);
    if (isActive) {
      console.log("hi");
      document.body.style.backgroundImage = `url('${image}')`;
    } else {
      document.body.style.background = `white`;
    }
  }, []);

  return (
    <div className="Main">
      <Header />
      {isActive ? (
        <div>
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
      ) : (
        <div>Login required</div>
      )}
    </div>
  );
}

export default Main;
