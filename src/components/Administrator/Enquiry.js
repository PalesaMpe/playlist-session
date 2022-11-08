import { useState } from "react";
import axios from "axios";

function Enquiry() {
  var id = JSON.parse(window.localStorage.getItem("user")).id;
  var name = JSON.parse(window.localStorage.getItem("user")).name;
  var surname = JSON.parse(window.localStorage.getItem("user")).surname;
  var email = JSON.parse(window.localStorage.getItem("user")).email;

  return (
    <div className="AdminPage">
      <div className="container con2">
        <div className="row">
          <div className="col-lg-6">
            <form className="InfoDisplay">
              <textarea></textarea>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Type..."
              />
            </form>
          </div>
          <div className="col-lg-6">
            <button className="ButtonDisplay">
              <p>Submit</p>
            </button>

            <button className="ButtonDisplay">
              <p>Clear</p>
            </button>

            <button className="ButtonDisplay">
              <p>Clear all updates</p>
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default Enquiry;
