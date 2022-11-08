import { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ReactDOM } from "react";
import { tab } from "@testing-library/user-event/dist/tab";
import Enquiries from "./Enquiry";

const arrEmails = [];
const arrUsers = [];

function Update() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [updateText, setUpdateText] = useState("");
  const [enquiries, setEnquiry] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5a7jph7",
        "template_pjhx7v8",
        form.current,
        "6uxSV5r466SOD9iY5"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useEffect(() => {
    //const getSubscribers = async () => {
    //   await axios.get("http://localhost:3001/subscribers").then((response) => {
    //     setSubscribers(response.data);
    //     console.log(response.data[i]);
    //     console.log(subscribers.length);
    //     for (var i = 0; i < subscribers.length; i++) {
    //       arrEmails.push(response.data[i].Email);
    //       arrUsers.push(response.data[i].Name + " " + response.data[i].Surname);
    //     }
    //   });
    // };

    const getEnquiries = async () => {
      await axios.get("http://localhost:3001/enquiries").then((response) => {
        console.log(response.data);
        setEnquiry(response.data);

        console.log(enquiries.length);
        arrEmails.push(response.data);
        for (var i = 0; i < enquiries.length; i++) {
          arrUsers.push(response.data[i].Name + " " + response.data[i].Surname);
        }
      });
    };
    getEnquiries();
    //  getSubscribers();
  }, []);

  const addUpdate = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/addUpdate", {
        updateID: 0,
        updateText: updateText,
        dateLogged: new Date().toLocaleDateString(),
      })
      .then(() => {
        console.log("successes");
      });
  };

  var createElements = (e) => {
    var elements = [];
    var index = 0;
    console.log("sub" + enquiries[0]);

    for (var i = 0; i <= enquiries.length - 1; i++) {
      elements.push(
        <tr>
          <th scope="row">{i}</th>
          <td>{arrEmails[0][i].Email}</td>
          <td>{arrEmails[0][i].Name + " " + arrEmails[0][i].Surname}</td>
          {console.log(i)}
          <button className="view">View</button>
        </tr>
      );
    }
    return elements;
  };

  const showSubscribeForm = async (e) => {
    setShowSubscribe(!showSubscribe);

    setShowEnquiry(false);
    setShowRating(false);
  };

  const showEnquiryForm = () => {
    setShowEnquiry(!showEnquiry);

    setShowRating(false);
    setShowSubscribe(false);
  };

  const showRatingForm = () => {
    setShowRating(!showRating);

    setShowSubscribe(false);
    setShowEnquiry(false);
  };

  return (
    <div className="AdminPage">
      <div className="container con2">
        <div className="row">
          <div className="col-lg-6">
            <button className="ButtonDisplay" onClick={showSubscribeForm}>
              <p>Post Newsletter</p>
            </button>
            <button className="ButtonDisplay" onClick={showEnquiryForm}>
              <p>Enquiries</p>
            </button>
            <button className="ButtonDisplay" onClick={showRatingForm}>
              <p>Clear all updates</p>
            </button>
          </div>
          <div className="col-lg-6">
            {showEnquiry && (
              <form className="InfoDisplay">
                <div className="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">User</th>
                        <th scope="col">Enquiry</th>
                      </tr>
                    </thead>
                    <tbody>{createElements()}</tbody>
                  </table>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="loginBtn">
                    Subscribe
                  </button>
                </div>
              </form>
            )}
            {showSubscribe && (
              <form ref={form} className="InfoDisplay">
                <div className="form-group mt-3">
                  <label>Newsletter</label>
                  <br />
                  <label name="user_email">palempe25@gmail.com</label>
                  <textarea
                    name="message"
                    onChange={(e) => {
                      setUpdateText(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="loginBtn">
                    View subscribers
                  </button>
                  <button
                    type="submit"
                    className="loginBtn"
                    onClick={addUpdate}
                  >
                    Post to subscribers
                  </button>
                  {subscribers.map((val, key) => {
                    return <div>{val.Email}</div>;
                  })}
                </div>
              </form>
            )}
            {showRating && (
              <form className="InfoDisplay">
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
    </div>
  );
}

export default Update;
