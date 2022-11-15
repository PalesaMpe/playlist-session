import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";
import Note from "./Note";
import Header from "./Header";
import NoteList from "./NoteList";
import image from "../images/background5.jpg";

function Counter() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  var setCountdown = 0;
  var timer;

  const secondsT = (seconds) => {
    var hours = Math.floor(seconds / (60 * 60));
    var divisor_minutes = seconds / 60;
    var minutes = Math.floor(divisor_minutes / 60);
    var divisor_seconds = divisor_minutes % 60;
    var seconds = Math.ceil(divisor_seconds);

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };
  useEffect(() => {
    if (setCountdown >= 0) {
      const secondsLeft = setInterval(() => {
        setCountdown = setCountdown - 1;
        let timeLeft = secondsT(setCountdown);
        setHours(timeLeft.h);
        setMinutes(timeLeft.m);
        setSeconds(timeLeft.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log("time fail");
    }
    console.log(setCountdown);
  }, setCountdown);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const toMilliseconds = (time) => {
    setHours(parseInt(time.split(":")[0]));
    setMinutes(parseInt(time.split(":")[1]));
    setSeconds(parseInt(time.split(":")[2]));

    console.log("hours" + hours);
    console.log(seconds);
    setCountdown = hours * 60 * 60 + minutes * 60 + seconds;
    console.log(setCountdown);
    return (hours * 60 + minutes) * 60000 + seconds * 1000;
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
            <div className="conn2">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="user-preference">
                    <div className="close">&times;</div>

                    <h2>Unhappy with playlist?</h2>
                    <p> Enter details to improve generated playlists</p>
                    <form className="preferenceForm">
                      <label>Favourite genre</label>
                      <input list="genres" />
                      <datalist id="genres">
                        <option value="Alternative" />
                        <option value="Ambient" />
                        <option value="Amapiano" />
                        <option value="Classical" />
                        <option value="Chillwave" />
                        <option value="Country" />
                        <option value="Contemporary Jazz" />
                        <option value="Deep House" />
                        <option value="EDM" />
                        <option value="RnB" />
                        <option value="RnB" />
                      </datalist>
                    </form>

                    <button>submit</button>
                  </div>
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

export default Counter;
