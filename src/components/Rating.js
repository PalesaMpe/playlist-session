import { useState } from "react";
import axios from "axios";

function Rating() {
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
    e.preventDefault();
    console.log(name);
    axios
      .post("http://localhost:3001/addEnquiry", {
        enquiryID: 0,
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
              <label>Email: {email}</label>
              <br />
              <textarea
                onChange={(e) => {
                  setEnquiry(e.target.value);
                }}
              ></textarea>{" "}
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

          <button className="ButtonDisplay" onClick={showRatingForm}>
            <p>Rate & Feedback</p>
          </button>
          {showRating && (
            <form className="InfoDisplay">
              <div className="form-group mt-3">
                <input type="radio" name="rating" id="rating-5" />
                <label for="rating-5" className="rate-5">
                  &#9734;
                </label>
                <input type="radio" name="rating" id="rating-4" />
                <label for="rating-4" className="rate-4">
                  &#9734;
                </label>
                <input type="radio" name="rating" id="rating-3" />
                <label for="rating-3" className="rate-3">
                  &#9734;
                </label>
                <input type="radio" name="rating" id="rating-2" />
                <label for="rating-2" className="rate-2">
                  &#9734;
                </label>
                <input type="radio" name="rating" id="rating-1" />
                <label for="rating-1" className="rate-1">
                  &#9734;
                </label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="loginBtn">
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

export default Rating;
