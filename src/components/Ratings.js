import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Player from "./Player";
import Note from "./Note";
import Header from "./Header";
import NoteList from "./NoteList";
import image from "../images/background5.jpg";
import noProfile from "../images/noProfile.png";
import { click } from "@testing-library/user-event/dist/click";

function Ratings() {
  const [profile, setProfile] = useState("");
  const [rating, setRating] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [review, setReview] = useState("");

  //  var clicked = false;
  var currentPage = "/Ratings";
  window.localStorage.setItem("currentPage", currentPage);
  window.localStorage.removeItem("notes");

  var isActive = window.localStorage.getItem("Active");
  var userID = parseInt(window.localStorage.getItem("user"));
  var view = document.getElementsByClassName("rate");
  var revTextarea = document.getElementsByClassName("reviewText");

  useEffect(() => {
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

  const addReview = async () => {
    var index = Math.floor(Math.random() * 999999);

    await axios
      .post(`http://localhost:3001/addReview`, {
        reviewID: "review" + index,
        userID: userID,
        rating: rating,
        reviewText: review,
      })
      .then((response) => {
        alert("Review sent");
        setRating(0);
        for (var i = 0; i < view.length; i++) {
          view[i].style.background = "none";
        }
        revTextarea[0].value = "";
      });
  };
  const loadRating = (number) => {
    setRating(number);
    console.log(rating);
    for (var i = 0; i < view.length; i++) {
      view[i].style.background = "none";
    }
    view[rating - 1].style.backgroundColor = "orange";
  };
  return (
    <div className="Study">
      {isActive ? (
        <div>
          <Header />
          <header className="App-header">
            <h1 className="Welcome">Hi {profile.Name}</h1>
            <p style={{ color: "white" }}>
              Hope you are enjoying your Sessions
            </p>

            <div className="container conn1">
              <div className="UpdateDisplay">
                <h1>Rate Us!</h1>
                <div>
                  <button
                    className="rate"
                    onClick={() => {
                      loadRating(1);
                    }}
                  >
                    1
                  </button>
                  <button
                    className="rate"
                    onClick={() => {
                      loadRating(2);
                    }}
                  >
                    2
                  </button>
                  <button
                    className="rate"
                    onClick={() => {
                      loadRating(3);
                    }}
                  >
                    3
                  </button>
                  <button
                    className="rate"
                    onClick={() => {
                      loadRating(4);
                    }}
                  >
                    4
                  </button>
                  <button
                    className="rate"
                    onClick={() => {
                      loadRating(5);
                    }}
                  >
                    5
                  </button>
                </div>

                <label>Review</label>
                <br />
                <textarea
                  className="reviewText"
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                ></textarea>

                <div className="d-grid gap-2 mt-3">
                  <button className="loginBtn" onClick={addReview}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <div>Login required</div>
      )}
    </div>
  );
}

export default Ratings;
