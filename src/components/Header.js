import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Cg from "react-icons/cg";
import * as Bi from "react-icons/bi";
import * as Fi from "react-icons/fi";
import SideBar from "./SideBar";
import * as Gi from "react-icons/gi";

function Header() {
  const [showBar, setBar] = useState(false);

  const showSideBar = (e) => {
    console.log("hi");
    e.preventDefault();
    setBar(!showBar);
  };
  return (
    <div>
      <nav class="navbar fixed-top navbar-expand-lg">
        <a class="navbar-brand" href="#">
          <h1>PLAYLIST SESSION </h1>
        </a>
        <button class="navbar-toggler" type="button">
          <span class="navbar-toggler-icon" onClick={showSideBar}></span>
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
              <Gi.GiHamburger />{" "}
              <button class="navbar-toggler">
                <span onClick={showSideBar}>{Gi.GiHamburger}</span>
              </button>
            </form>
          </div>
        </div>
      </nav>
      {showBar && <SideBar />}
    </div>
  );
}

export default Header;
