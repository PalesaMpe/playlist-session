import { useState } from "react";
import axios from "axios";

function Contact() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [enquiry, setEnquiry] = useState("");

  var date = new Date().toLocaleDateString();
  var id = JSON.parse(window.localStorage.getItem("user")).id;
  var name = JSON.parse(window.localStorage.getItem("user")).name;
  var surname = JSON.parse(window.localStorage.getItem("user")).surname;
  var email = JSON.parse(window.localStorage.getItem("user")).email;

  const addSubscriber = async (e) => {
    e.preventDefault();
    console.log(name);
    axios
      .post("http://localhost:3001/addSubscriber", {
        id: id,
        name: name,
        surname: surname,
        email: email,
      })
      .then(() => {
        console.log("successes");
      });
  };
  const addEnquiry = async (e) => {
    var index = Math.floor(Math.random() * 999999);

    e.preventDefault();
    console.log(name);
    axios
      .post("http://localhost:3001/addEnquiry", {
        enquiryID: "enquiry" + index,
        enquiry: enquiry,
        userID: id,
        name: name,
        surname: surname,
        email: email,
        dateSubmitted: date,
      })
      .then(() => {
        console.log("successes");
      });
  };

  const showSubscribeForm = () => {
    setShowSubscribe(!showSubscribe);
  };
  const showEnquiryForm = () => {
    setShowEnquiry(!showEnquiry);
  };

  const showRatingForm = () => {
    setShowRating(!showRating);
  };

  return (
    <div className="container con2">
      <div className="row">
        <div className="col-lg-6">
          <button className="ButtonDisplay" onClick={showEnquiryForm}>
            <p>Enquiry</p>
          </button>
          {showEnquiry && (
            <form className="InfoDisplay">
              <label>{email}</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Subject"
              />

              <textarea
                onChange={(e) => {
                  setEnquiry(e.target.value);
                }}
              ></textarea>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="loginBtn" onClick={addEnquiry}>
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
  );
}

export default Contact;
