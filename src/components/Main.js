import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";

function Main() {
  const [searchKey, setSearchKey] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [profile, setProfile] = useState("");

  var token = window.localStorage.getItem("token");
  var arrTracks = [];
  var logout = () => {
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(data);
      console.log(data);
    };

    getUser();
  }, []);

  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    console.log(data);
    setTracks(data.tracks.items);
    for (var i = 0; i <= Tracks.length - 1; i++) {
      arrTracks.push(Tracks[i].uri);
    }
    setPlayingTracks(arrTracks);
    console.log(playingTracks);
  };

  const renderTracks = () => {
    return Tracks.map((track) => (
      <div key={track.id}>
        {track.album.images.length ? (
          <img width={"5%"} src={track.album.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {track.name}
      </div>
    ));
  };

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
      <header className="App-header">
        <h1>WELCOME {profile.display_name}</h1>
        {token ? (
          <div>
            <form onSubmit={searchTracks}>
              <input
                type="text"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        ) : (
          <h2>Please login</h2>
        )}
        <div class="container-fluid h-55 ms-0 p-3 border bg-primary">
          {renderTracks()}
          <Player accessToken={token} trackUri={playingTracks} />
        </div>

        <Link to="/Login">
          <button onClick={logout}>Logout</button>
        </Link>
      </header>
    </div>
  );
}

export default Main;
