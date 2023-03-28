import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";
import Note from "./Note";
import Header from "./Header";
import NoteList from "./NoteList";

function Exercise() {
  const CLIENT_ID = "db03438a98c64224a6e4861ebf1b226e";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [playingTracks, setPlayingTracks] = useState([]);
  const [profile, setProfile] = useState("");
  const [playlistId, setPlaylistId] = useState([]);
  const [countdown, setCountdown] = useState(0);

  var arrTracks = [];
  var arrPlaylist = ["classical essential", "lofi beats", "Calming Acoustic"];
  var currentPage = "/Study";

  window.localStorage.setItem("currentPage", currentPage);

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

  const toMilliseconds = (time) => {
    var hours = parseInt(time.split(":")[0]);
    console.log("hours" + hours);
    var minutes = parseInt(time.split(":")[1]);
    var seconds = parseInt(time.split(":")[2]);

    return (hours * 60 + minutes) * 60000 + seconds * 1000;
  };

  const toMinutes = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = (milliseconds % 60000) / 1000;

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const addNote = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("notes"));
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
    console.log(playlistId);
    searchTracks();
  };

  const searchTracks = async () => {
    var addedTime = 0;
    var timer = searchKey;
    var ms = toMilliseconds(timer);

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

      //console.log(data.tracks.items);
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
    console.log("number of items" + arrTracks.length);
    setTracks(arrTracks);

    arrTracks = [];
    for (var i = 0; i <= Tracks.length - 1; i++) {
      addedTime += Tracks[i].track.duration_ms;
      arrTracks.push(Tracks[i].track.uri);
    }

    //  console.log(Tracks);
    setCountdown(toMinutes(addedTime));
    setPlayingTracks(arrTracks);
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
    <div className="App">
      <Header />
      <header className="App-header">
        <h1>WELCOME {profile.display_name}</h1>

        <div className="container conn1">
          <div className="row">
            <div className="col-lg-6">
              <div className="notes">
                <textarea className="sticky-note">This first note yay</textarea>
                <textarea className="sticky-note">This first note yay</textarea>
                <textarea className="sticky-note">This first note yay</textarea>
                <button className="add-note">+</button>
              </div>
            </div>
            {addNote}
            <div className="col-lg-6">
              <div>
                <form onSubmit={searchPlaylists}>
                  <button className="btn btn-rounded mb-3 mt-3" type="submit">
                    Generate
                  </button>
                  <input
                    type="time"
                    step={1}
                    onChange={(e) => {
                      setSearchKey(e.target.value);
                      console.log(searchKey);
                    }}
                  />
                </form>
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
                  <Player accessToken={token} trackUri={playingTracks} />
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
  );
}

export default Exercise;
