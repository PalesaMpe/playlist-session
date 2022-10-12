import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";

function Study() {
  const CLIENT_ID = "db03438a98c64224a6e4861ebf1b226e";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [profile, setProfile] = useState("");
  const [playlists, setPlaylists] = useState(["classical essential", "tester"]);
  const [defaultPlay, setDefault] = playlists[1];
  const [playlistUrl, setPlaylistUrl] = useState("");
  var arrTracks = [];
  var arrPlaylists = ["classical essential", "tester"];
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

  const searchPlaylists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: arrPlaylists[0],
        type: "playlist",
      },
    });
    console.log(data.playlists.items);
    setPlaylistUrl(data.playlists.items[0].id);

    searchTrack();
    //  console.log(playingTracks);
  };

  const searchTrack = async () => {
    console.log(token);
    console.log(playlistUrl);
    const { data } = await axios.get(
      `	https://api.spotify.com/v1/playlists/${playlistUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(data.tracks.items);
    setTracks(data.tracks.items);
    for (var i = 0; i <= Tracks.length - 1; i++) {
      arrTracks.push(Tracks[i].track.uri);
    }
    setPlayingTracks(arrTracks);
    // console.log(playingTracks);
  };
  const renderTracks = () => {
    return Tracks.map((track) => (
      <div key={track.track.id}>
        {track.track.album.images.length ? (
          <img width={"15%"} src={track.track.album.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {track.name}
      </div>
    ));
  };

  var logout = () => {
    window.localStorage.removeItem("token");
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
        {!token ? (
          <div className="spotifyLink">
            CONNECT WITH
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}
            >
              SPOTIFY
            </a>
          </div>
        ) : (
          <div></div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <form onSubmit={searchPlaylists}>
                  <input
                    type="text"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </form>
              </div>
              <div className="display">
                {renderTracks()}
                <Player accessToken={token} trackUri={playingTracks} />
              </div>
            </div>{" "}
            <div className="col-lg-6">
              <div>
                <button type="submit">Generate</button>
              </div>
            </div>
          </div>
        </div>

        <Link to="/Login">
          <button onClick={logout}>Logout</button>
        </Link>
      </header>
    </div>
  );
}

export default Study;
