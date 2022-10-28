import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Cg from "react-icons/cg";
import * as Bi from "react-icons/bi";
import * as Fi from "react-icons/fi";

function Header() {
  const [showBar, setBar] = useState(false);

  const showSideBar = () => {
    setBar(!showBar);
  };
  return (
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">
        <h1>PLAYLIST SESSION </h1>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <h5>
                Study <span class="sr-only">(current)</span>
              </h5>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <h5>Travel</h5>
            </a>
          </li>
        </ul>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <form class="form-inline my-2 ustify-content-end">
            <Link to="/Info">
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Info
              </button>
            </Link>
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={showSideBar}
            >
              Profile
            </button>
            {showBar ? (
              <div>
                <form className="Sidebar">
                  <ul>
                    <li>
                      <Cg.CgProfile />
                      Profile
                    </li>
                    <li>
                      <Cg.CgInfo />
                      Info
                    </li>
                    <li>
                      <Bi.BiLibrary />
                      Library
                    </li>
                    <li>
                      <Fi.FiSettings />
                      Settings
                    </li>
                    <li>Log out</li>
                  </ul>
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
