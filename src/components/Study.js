import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";
import Note from "./Note";
import Header from "./Header";
import NoteList from "./NoteList";
import image from "../images/background5.jpg";

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
  const [playlistId, setPlaylistId] = useState({});

  var arrTracks = [];
  var arrNotes = [];
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  var setCountdown = 0;
  var arrPlaylist = ["classical essential", "lofi beats", "Calming Acoustic"];
  var timer;

  var currentPage = "/Study";
  window.localStorage.setItem("currentPage", currentPage);
  window.localStorage.removeItem("notes");

  var isActive = window.localStorage.getItem("Active");
  var userID = window.localStorage.getItem("user");

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (isActive) {
      console.log("hi");
      document.body.style.backgroundImage = `url('${image}')`;
    } else {
      document.body.style.background = `white`;
    }
    const getUser = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(data);
      window.localStorage.setItem("spotify", JSON.stringify(data));
    };
    if (token) {
      setToken(token);
      getUser();
    }
  }, []);

  const toMilliseconds = (time) => {
    setHours(parseInt(time.split(":")[0]));
    setMinutes(parseInt(time.split(":")[1]));
    setSeconds(parseInt(time.split(":")[2]));

    return (hours * 60 + minutes) * 60000 + seconds * 1000;
  };

  const searchPlaylists = async (e) => {
    e.preventDefault();

    var arrFirstElementPlaylist = [];
    for (var i = 0; i <= 2; i++) {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: arrPlaylist[i],
          type: "playlist",
        },
      });
      console.log(data.playlists.items);

      //First playlist from each default list of playlists
      arrFirstElementPlaylist.push(data.playlists.items[0]);
    }
    //id from each playlists
    setPlaylistId([
      arrFirstElementPlaylist[0].id,
      arrFirstElementPlaylist[1].id,
      arrFirstElementPlaylist[2].id,
    ]);
    console.log(arrFirstElementPlaylist[2].id);
    console.log(playlistId);

    searchTracks();
  };

  const searchTracks = async () => {
    var addedTime = 0;
    var timer = searchKey;

    var ms = toMilliseconds(timer);
    console.log(ms);
    arrPlaylist = [];
    for (var i = 0; i <= 2; i++) {
      const { data } = await axios.get(
        `	https://api.spotify.com/v1/playlists/${playlistId[i]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      arrPlaylist.push(data.tracks.items);
    }

    arrPlaylist = arrPlaylist[0].concat(arrPlaylist[1]);
    console.log(arrPlaylist);
    while (addedTime <= ms) {
      var index = Math.floor(Math.random() * arrPlaylist.length);

      addedTime += arrPlaylist[index].track.duration_ms;
      arrTracks.push(arrPlaylist[index]);
      arrPlaylist.splice(index, 1);
    }
    arrPlaylist = [];

    console.log(arrTracks);
    console.log("number of items" + arrTracks.length);
    setTracks(arrTracks);
    //delayed
    console.log(Tracks);
    arrTracks = [];
    for (var i = 0; i <= Tracks.length - 1; i++) {
      addedTime += Tracks[i].track.duration_ms;
      arrTracks.push(Tracks[i].track.uri);
    }
    console.log(arrTracks);
    setPlayingTracks(arrTracks);
    console.log(playingTracks);
  };

  const renderTracks = () => {
    return Tracks.map((track) => (
      <div key={track.track.id}>
        {track.track.album.images.length ? (
          <img width={"15%"} src={track.track.album.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {track.track.name}
      </div>
    ));
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
            <h1 className="Welcome">WELCOME {profile.display_name}</h1>
            <div className="container conn1">
              <div className="row">
                <div className="col-lg-6">
                  <h1>Pomodoro Timer</h1>

                  <div>
                    {hours < 9 ? "0" + hours : hours}:
                    {minutes < 9 ? "0" + minutes : minutes}:
                    {seconds < 9 ? "0" + seconds : seconds}
                  </div>
                  <button>Start session</button>
                  <button>Stop Session</button>
                </div>
                <div className="col-lg-6">
                  <div>
                    <form onSubmit={searchPlaylists}>
                      <button
                        className="btn btn-rounded mb-3 mt-3"
                        type="submit"
                      >
                        Generate
                      </button>
                    </form>
                    <input
                      type="time"
                      className="form-control mb-3"
                      step={1}
                      onChange={(e) => {
                        setSearchKey(e.target.value);
                        console.log(searchKey);
                      }}
                    />
                  </div>
                  {!token ? (
                    <div>
                      <div className=" coverDisplay">
                        CONNECT WITH
                        <a
                          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`}
                        >
                          SPOTIFY
                        </a>
                      </div>
                      <Player accessToken={token} trackUri={arrTracks} />
                      <a href="">Personalise Playlist?</a>
                    </div>
                  ) : (
                    <div>
                      <div className="display">{renderTracks()}</div>
                      <Player accessToken={token} trackUri={playingTracks} />
                      <a href="">Personalise Playlist?</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <form className="logout">
              <Link to="/Login">
                <button className="logoutBtn" onClick={logout}>
                  Logout
                </button>
              </Link>{" "}
            </form>
          </header>
        </div>
      ) : (
        <div>Login required</div>
      )}
    </div>
  );
}

export default Study;
