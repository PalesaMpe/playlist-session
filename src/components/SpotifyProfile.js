import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";
import Note from "./Note";
import Header from "./Header";
import NoteList from "./NoteList";
import image from "../images/background5.jpg";
import noProfile from "../images/noProfile.png";
function SpotifyProfile() {
  const CLIENT_ID = "db03438a98c64224a6e4861ebf1b226e";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [profile, setProfile] = useState("");
  const [spotifyLog, setSpotifyLog] = useState(false);

  var currentPage = "/Profile";
  window.localStorage.setItem("currentPage", currentPage);
  window.localStorage.removeItem("notes");

  var isActive = window.localStorage.getItem("Active");
  var userID = parseInt(window.localStorage.getItem("user"));
  var spotifyUser = JSON.parse(window.localStorage.getItem("spotify"));

  useEffect(() => {
    if (spotifyUser.length > 0) {
    }
    if (isActive) {
      document.body.style.backgroundImage = `url('${image}')`;
    } else {
      document.body.style.background = `white`;
    }

    const getUser = async () => {
      await axios
        .get(`http://localhost:3001/user1/${userID}`)
        .then((response) => {
          setProfile(response.data[0]);
        });
    };
    getUser();
    console.log(profile.Name);
  }, []);
  const updateUser = async (e) => {
    e.preventDefault();
    console.log(profile.Name);
    axios.put(`http://localhost:3001/updateUser`, {
      userID: userID,
      userName: profile.Name,
      userSurname: profile.Surname,
      userEmail: profile.Email,
    });
  };
  const deleteUser = async () => {
    if (window.confirm("Delete Account")) {
      await axios
        .delete(`http://localhost:3001/deleteUser/${profile.Email}`)
        .then((response) => {});
      window.location.href = "/Login";
    }
  };

  var logout = () => {
    window.localStorage.removeItem("token");
  };

  return (
    <div className="Study">
      {isActive ? (
        <div>
          <Header />
          <header className="App-header">
            <h1 className="Welcome">
              {profile.Name} {profile.Surname}
            </h1>
            {spotifyUser.images.length && spotifyUser.images[0].url ? (
              <img src={spotifyUser.images[0].url} alt="Avatar" />
            ) : (
              <div>
                <img src={noProfile} alt="no-profile" />
              </div>
            )}
            <div className="container conn1">
              <form className="UpdateDisplay">
                <label>Name</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={profile.Name}
                  name="user_name"
                />
                <label>Surname</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={profile.Surname}
                  name="user_email"
                />
                <label>Email</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={profile.Email}
                  name="user_email"
                />
                <label>ID</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={profile.Email}
                  name="user_email"
                />

                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="loginBtn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </header>
          <button className="deleteBtn" onClick={deleteUser}>
            Delete Account
          </button>
          <Link to="/Login">
            <button className="logoutBtn" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div>Login required</div>
      )}
    </div>
  );
}

export default SpotifyProfile;
