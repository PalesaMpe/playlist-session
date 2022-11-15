import { useState, useEffect } from "react";
import axios from "axios";
import image from "../images/background5.jpg";
import Header from "./Header";

function Contact() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const [profile, setProfile] = useState("");

  var date = new Date().toLocaleDateString();
  var userID = JSON.parse(window.localStorage.getItem("user"));
  var isActive = window.localStorage.getItem("Active");

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
  }, []);
  const addSubscriber = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/addSubscriber", {
        id: userID,
        name: profile.Name,
        surname: profile.Surname,
        email: profile.Email,
      })
      .then(() => {
        console.log("successes");
      });
  };
  const addEnquiry = async (e) => {
    var index = Math.floor(Math.random() * 999999);

    e.preventDefault();
    console.log(index);
    axios
      .post("http://localhost:3001/addEnquiry", {
        enquiryID: "enquiry" + index,
        enquiry: enquiry,
        userID: userID,
        name: profile.Name,
        surname: profile.Surname,
        email: profile.Email,
        dateSubmitted: date,
      })
      .then(() => {
        console.log("successes");
        alert("Enquiry sent");
        setShowEnquiry(false);
      });
  };

  const showSubscribeForm = () => {
    setShowSubscribe(!showSubscribe);
  };
  const showEnquiryForm = () => {
    setShowEnquiry(!showEnquiry);
  };

  return (
    <div className="Contact">
      <Header />
      {isActive ? (
        <div className="container con2">
          <div className="row">
            <div className="col-lg-6">
              <button className="ButtonDisplay" onClick={showEnquiryForm}>
                <p>Enquiry</p>
              </button>
              {showEnquiry && (
                <form className="InfoDisplay">
                  <label>From: {profile.Email}</label>
                  <textarea
                    className="reviewText"
                    onChange={(e) => {
                      setEnquiry(e.target.value);
                    }}
                  ></textarea>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="loginBtn"
                      onClick={addEnquiry}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="col-lg-6">
              <button className="ButtonDisplay" onClick={showSubscribeForm}>
                <p>Subscribe to newsletter</p>
              </button>
              {showSubscribe && (
                <form className="InfoDisplay">
                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="loginBtn"
                      onClick={addSubscriber}
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Login required</div>
      )}
    </div>
  );
}

export default Contact;
