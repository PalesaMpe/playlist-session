import { useState, useEffect } from "react";
import axios from "axios";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function Enquiry() {
  const [response, setResponse] = useState("");
  const [enquiry, setEnquiry] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryText, setEnquiryText] = useState("");
  const [dateSubmitted, setDateSubmitted] = useState();

  const form = useRef();

  var enquiryIndex = window.localStorage.getItem("enquiryID");
  useEffect(() => {
    const getEnquiries = async () => {
      await axios.get("http://localhost:3001/enquiries").then((response) => {
        console.log(response.data[enquiryIndex]);

        setEnquiry(response.data[enquiryIndex]);
      });
    };
    getEnquiries();
    setName(enquiry.Name);
    console.log(name);
    setSurname(enquiry.Surname);
    //setEmail(enquiry.Email);
    setEmail("palempe25@gmail.com");
    setEnquiryText(enquiry.Enquiry);
    setDateSubmitted(enquiry.DateSubmitted);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!window.confirm("Send email?")) {
      console.log("Cancelled");
    } else {
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
            window.location.href = "/Update";
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };
  return (
    <div className="AdminPage">
      <div className="container">
        <div className="row">
          <div className="enquiryText">
            From {name}
            <br />
            <br />
            {enquiryText}
            <br />
            <br />
            Date Submitted: {dateSubmitted}
          </div>
          <div className="col-lg-12">
            <form ref={form} className="InfoDisplay" onSubmit={sendEmail}>
              <input
                className="form-control mt-1"
                placeholder="Enter password"
                value={name}
                name="user_name"
              />
              <input
                className="form-control mt-1"
                placeholder="Enter password"
                value="palempe25@gmail.com"
                name="user_email"
              />

              <textarea
                name="message"
                onChange={(e) => {
                  setResponse(e.target.value);
                }}
              ></textarea>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="loginBtn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
