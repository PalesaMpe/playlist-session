import { useState, useEffect } from "react";
import axios from "axios";
import React, { useRef } from "react";

function ViewAdmin() {
  const [response, setResponse] = useState("");
  const [admin, setAdmin] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  var isActive = window.localStorage.getItem("adminActive");

  const showUpdateForm = async (e) => {
    setShowUpdate(!showUpdate);
    setShowDelete(false);
  };

  const showDeleteForm = () => {
    setShowDelete(!showDelete);
    setShowUpdate(false);
  };

  var adminID = window.localStorage.getItem("adminID");

  useEffect(() => {
    const getAdmin = async () => {
      await axios
        .get(`http://localhost:3001/admin/${adminID}`)
        .then((response) => {
          console.log(response.data[0]);
          setAdmin(response.data[0]);
        });
    };
    getAdmin();
  }, []);

  const deleteAdmin = async (e) => {
    e.preventDefault();
    if (window.confirm("Delete Admin?")) {
      axios
        .delete(`http://localhost:3001/deleteAdmin/${adminID}`)
        .then((response) => {
          console.log("successes");
        });

      window.localStorage.removeItem("adminID");
      window.location.href = "/Update";
    }
  };

  return (
    <div className="AdminPage">
      {isActive ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="updateText">
                AdminID: {admin.adminID}
                <br />
                Name: {admin.Name}
                <br />
                Surname: {admin.Surname}
                <br />
                IDNumber: {admin.IDNumber}
                <br />
                Cellphone: {admin.Cellphone}
                <br />
                Branch: {admin.Branch}
              </div>
            </div>
            <div className="col-lg-6">
              <button
                className="btnUpdate"
                onClick={() => {
                  showUpdateForm();
                }}
              >
                Update
              </button>
              <button className="btnDelete" onClick={deleteAdmin}>
                Delete
              </button>
            </div>

            <div className="col-lg-8">
              {showUpdate && (
                <form className="UpdateDisplay">
                  <label>AdminID</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={admin.Name}
                    name="user_name"
                  />
                  <label>Name</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={admin.Email}
                    name="user_email"
                  />
                  <label>Surname</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={admin.Email}
                    name="user_email"
                  />
                  <label>ID</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={admin.Email}
                    name="user_email"
                  />
                  <label>Cellphone</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={admin.Email}
                    name="user_email"
                  />
                  <label>Branch</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={admin.Email}
                    name="user_email"
                  />

                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="loginBtn">
                      Send
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

export default ViewAdmin;
