import { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ReactDOM } from "react";
import { tab } from "@testing-library/user-event/dist/tab";
import Enquiries from "./Enquiry";
import { Button } from "bootstrap";

const arrUsers = [];
const arrAdmins = [];
var arrReviews = [];
const arrCurrentAdmin = [];

function Update() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [subscribers, setSubscribers] = useState([]);
  const [updateText, setUpdateText] = useState("");
  const [enquiries, setEnquiry] = useState("");
  const [reviews, setReviews] = useState("");
  const [option, setOption] = useState("default");

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [retry, setRetry] = useState("");

  const form = useRef();

  const role = window.localStorage.getItem("role");
  var isActive = window.localStorage.getItem("adminActive");
  var adminID = window.localStorage.getItem("currentAdmin");

  const showSubscribeForm = async (e) => {
    setShowSubscribe(!showSubscribe);

    setShowEnquiry(false);
    setShowAdmin(false);
    setShowReview(false);
    setShowInfo(false);
  };

  const showEnquiryForm = () => {
    setShowEnquiry(!showEnquiry);

    setShowAdmin(false);
    setShowSubscribe(false);
    setShowReview(false);
    setShowInfo(false);
  };

  const showReviewForm = () => {
    setShowReview(!showReview);

    setShowAdmin(false);
    setShowSubscribe(false);
    setShowEnquiry(false);
    setShowInfo(false);
  };

  const showAdminForm = () => {
    setShowAdmin(!showAdmin);

    setShowSubscribe(false);
    setShowEnquiry(false);
    setShowInfo(false);
    setShowReview(false);
  };

  const showInfoForm = () => {
    setShowInfo(!showInfo);

    setShowAdmin(false);
    setShowSubscribe(false);
    setShowEnquiry(false);
    setShowReview(false);
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

    document.body.style.background = `grey`;

    const getUser = async () => {
      await axios.get(`http://localhost:3001/user1/55}`).then((response) => {
        setUser(response.data[0]);
      });
    };

    const getEnquiries = async () => {
      await axios.get("http://localhost:3001/enquiries").then((response) => {
        console.log(response.data);
        setEnquiry(response.data);

        console.log(enquiries.length);
        arrUsers.push(response.data);
      });
    };

    const getAdmins = async () => {
      await axios.get("http://localhost:3001/admins").then((response) => {
        console.log(response.data);

        console.log(response.data);
        //console.log(admin.length);
        arrAdmins.push(response.data);
      });
    };
    const getCurrentAdmin = async () => {
      await axios
        .get(`http://localhost:3001/admin/${adminID}`)
        .then((response) => {
          console.log(response.data);
          arrCurrentAdmin.push(response.data);
        });
    };

    console.log(arrUsers[0]);
    console.log(arrCurrentAdmin);
    getUser();
    getAdmins();
    getEnquiries();
    getCurrentAdmin();
  }, []);

  useEffect(() => {
    console.log(option);

    if (option == "high") {
      arrReviews = [];
      console.log("i got");
      axios.get("http://localhost:3001/reviewsDESC").then((response) => {
        console.log(response.data);
        setReviews(response.data);

        arrReviews.push(response.data);
        console.log(arrReviews[0]);
      });
    }
    if (option == "low") {
      arrReviews = [];
      console.log("i got");
      console.log(arrReviews);
      axios.get("http://localhost:3001/reviewsASC").then((response) => {
        console.log(response.data);
        setReviews(response.data);

        arrReviews.push(response.data);
        console.log(arrReviews[0]);
      });
    }
    if (option == "default") {
      arrReviews = [];
      console.log("i got");
      console.log(arrReviews);
      axios.get("http://localhost:3001/reviews").then((response) => {
        console.log(response.data);
        setReviews(response.data);

        arrReviews.push(response.data);
        console.log(arrReviews[0]);
      });
    }
  }, [option]);

  const descSort = () => {
    arrReviews = [];
    axios.get("http://localhost:3001/reviewsDESC").then((response) => {
      console.log(response.data);
      setReviews(response.data);

      arrReviews.push(response.data);
      console.log(arrReviews[0]);
    });
  };

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

  const updateInfo = (e) => {
    e.preventDefault();
    console.log(retry);
    console.log(password);
    console.log(name);
    if (password == retry && password != "") {
      console.log("worked");
      if (window.confirm("Update Information?")) {
        axios.put(`http://localhost:3001/updateAdmin`, {
          adminID: adminID,
          name: name,
          surname: surname,
          idNumber: idNumber,
          email: email,
          cellphone: cellphone,
          password: password,
        });
        setShowInfo(false);
      } else {
      }
    } else {
      alert("Password not matching");
    }
  };

  const clickedButton = async (e) => {
    e.preventDefault();
    console.log("clicked");

    var view = document.getElementsByClassName("view");

    for (let i = 0; i < view.length; i++) {
      view[i].addEventListener("click", function () {
        window.localStorage.setItem("enquiryIndex", i);
        console.log(arrUsers[0][i].EnquiryID);

        window.localStorage.setItem("enquiryID", arrUsers[0][i].EnquiryID);
        window.location.href = "/Enquiry";
      });
    }
  };

  var reviewElements = () => {
    var elements = [];
    console.log("sub" + arrReviews[0].length);

    let i = 0;
    while (i < arrReviews[0].length) {
      elements.push(
        <div className="reviewBorder">
          <label>Rating: {arrReviews[0][i].rating} star</label>
          <p>{arrReviews[0][i].reviewText}</p>
        </div>
      );
      i++;
    }

    return elements;
  };

  var createElements = () => {
    var elements = [];
    //var index = 0;
    console.log("sub" + enquiries);
    console.log(enquiries.length);

    let i = 0;

    while (i < enquiries.length) {
      elements.push(
        <tr>
          <th scope="row">{i}</th>
          <td>{arrUsers[0][i].Email}</td>
          <td>{arrUsers[0][i].Name + " " + arrUsers[0][i].Surname}</td>

          <button className={"view"} onClick={clickedButton}>
            View
          </button>
        </tr>
      );
      i++;
    }

    return elements;
  };

  const viewAdmin = async (e) => {
    e.preventDefault();
    var view = document.getElementsByClassName("view");
    console.log(view.length);

    for (let i = 0; i < view.length; i++) {
      view[i].addEventListener("click", function () {
        window.localStorage.setItem("adminID", arrAdmins[0][i].adminID);
        window.location.href = "/ViewAdmin";
      });
    }
  };
  var createAdminElements = () => {
    var elements = [];

    let i = 0;

    while (i < arrAdmins[0].length) {
      elements.push(
        <tr>
          <th scope="row">{arrAdmins[0][i].adminID}</th>
          <td>{arrAdmins[0][i].Name}</td>
          <td>{arrAdmins[0][i].Surname}</td>
          <td>{arrAdmins[0][i].IDNumber}</td>
          <td>{arrAdmins[0][i].Cellphone}</td>
          <td>{arrAdmins[0][i].Branch}</td>

          <button className={"view"} onClick={viewAdmin}>
            View
          </button>
        </tr>
      );
      i++;
    }

    return elements;
  };

  return (
    <div className="AdminPage">
      {isActive ? (
        <div>
          {role == "Head" ? (
            <div>
              <h1>HEAD ADMIN</h1>
            </div>
          ) : (
            <div></div>
          )}
          <div className="container con2">
            <div className="row">
              <div className="col-lg-6">
                <button className="ButtonDisplay" onClick={showSubscribeForm}>
                  <p>Post Newsletter</p>
                </button>
                <button className="ButtonDisplay" onClick={showEnquiryForm}>
                  Enquiries
                </button>
                <button className="ButtonDisplay" onClick={showReviewForm}>
                  View Reviews
                </button>
                <button className="ButtonDisplay" onClick={showReviewForm}>
                  View Users
                </button>
                {role == "Head" ? (
                  <div>
                    <button className="ButtonDisplay" onClick={showAdminForm}>
                      Manage Admins
                    </button>
                  </div>
                ) : (
                  <button className="ButtonDisplay" onClick={showInfoForm}>
                    Update Info
                  </button>
                )}
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
                  </form>
                )}
                {showSubscribe && (
                  <form ref={form} className="InfoDisplay">
                    <div className="form-group mt-3">
                      <label>Newsletter</label>
                      <br />
                      <label name="user_email">palempe25@gmail.com</label>
                      <textarea></textarea>
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
                {showAdmin && (
                  <form className="InfoDisplay">
                    <div className="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Admin</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">ID</th>
                            <th scope="col">Cellphone</th>
                            <th scope="col">Branch</th>
                          </tr>
                        </thead>
                        <tbody>{createAdminElements()}</tbody>
                      </table>
                    </div>

                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="loginBtn"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = "/AdminRegister";
                        }}
                      >
                        Add Admin
                      </button>
                    </div>
                  </form>
                )}
                {showReview && (
                  <form className="InfoDisplay">
                    <h1>Reviews </h1>
                    <select
                      name="sort"
                      className="sortDrop"
                      onChange={(e) => {
                        setOption(e.target.value);
                      }}
                    >
                      <option value="default">Default order</option>
                      <option value="high">Highest to Lowest rating</option>
                      <option value="low">Lowest to Highest rating</option>
                    </select>
                    <div className="form-group mt-3 reviewDisplay">
                      <div>{reviewElements()}</div>
                    </div>
                  </form>
                )}
                {showInfo && (
                  <form className="InfoDisplay">
                    <h1>{arrCurrentAdmin[0][0].adminID} </h1>
                    <div className="form-group mt-3">
                      <label>Name</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter name"
                        defaultValue={arrCurrentAdmin[0][0].Name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      ></input>
                      <label>Surname</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter surname"
                        defaultValue={arrCurrentAdmin[0][0].Surname}
                        onChange={(e) => {
                          setSurname(e.target.value);
                        }}
                      />
                      <label>ID</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter ID number"
                        defaultValue={arrCurrentAdmin[0][0].IDNumber}
                        onChange={(e) => {
                          setIdNumber(e.target.value);
                        }}
                      />
                      <label>Cellphone</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter cellphone number"
                        defaultValue={arrCurrentAdmin[0][0].Cellphone}
                        onChange={(e) => {
                          setCellphone(e.target.value);
                        }}
                      />
                      <label>Email</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter email"
                        defaultValue={arrCurrentAdmin[0][0].Email}
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <br />
                      <label>Password</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter password"
                        defaultValue={arrCurrentAdmin[0][0].Password}
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label>Retry Password</label>
                      <input
                        className="form-control mt-1"
                        placeholder="Enter password"
                        type="password"
                        onChange={(e) => {
                          setRetry(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="loginBtn"
                        onClick={updateInfo}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 mt-3 w-25">
            <button
              className="adminLogout"
              onClick={() => {
                window.localStorage.removeItem("role");
                window.location.href = "/Admin";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>Login required</div>
      )}
    </div>
  );
}

export default Update;
