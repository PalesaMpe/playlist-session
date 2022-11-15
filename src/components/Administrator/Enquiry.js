import { useState, useEffect } from "react";
import axios from "axios";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function Enquiry() {
  const [response, setResponse] = useState("");
  const [enquiry, setEnquiry] = useState("");

  const form = useRef();

  var enquiryID = window.localStorage.getItem("enquiryID");
  useEffect(() => {
    const getEnquiries = async () => {
      await axios
        .get(`http://localhost:3001/enquiry/${enquiryID}`)
        .then((response) => {
          console.log(response.data[0]);
          setEnquiry(response.data[0]);
        });
    };
    getEnquiries();
    console.log(enquiry);
    //setEmail(enquiry.Email);
  }, []);

  const deleteEnquiry = async (e) => {
    axios
      .delete(`http://localhost:3001/deleteEnquiry/${enquiryID}`)
      .then((response) => {
        console.log("successes");
      });
    window.localStorage.removeItem("enquiryID");
    window.location.href = "/Update";
  };

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
            deleteEnquiry();
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
            From {enquiry.Name}
            <br />
            <br />
            {enquiry.Enquiry}
            <br />
            <br />
            Date Submitted: {enquiry.DateSubmitted}
          </div>
          <div className="col-lg-12">
            <form ref={form} className="InfoDisplay">
              <input
                className="form-control mt-1"
                value={`${enquiry.Name} ${enquiry.Surname}`}
                name="user_name"
              />
              <input
                className="form-control mt-1"
                value={enquiry.Email}
                name="user_email"
              />

              <textarea
                name="message"
                onChange={(e) => {
                  setResponse(e.target.value);
                }}
              ></textarea>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="loginBtn" onClick={sendEmail}>
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
