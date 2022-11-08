import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Cg from "react-icons/cg";
import * as Bi from "react-icons/bi";
import * as Fi from "react-icons/fi";

function SideBar(barIndex) {
  return (
    <nav
      id="sidebarMenu"
      class="collapse d-lg-block sidebar collapse justify-content-end"
    >
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Account</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple active"
          >
            <i class="fas fa-chart-area fa-fw me-3"></i>
            <span>Library</span>
          </a>
          <a
            href="/Contact"
            class="list-group-item list-group-item-action py-2 ripple"
          >
            <i class="fas fa-lock fa-fw me-3"></i>
            <span>Contact</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
          >
            <i class="fas fa-lock fa-fw me-3"></i>
            <span>Ratings & Feedback</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
          >
            <i class="fas fa-calendar fa-fw me-3"></i>
            <span>Settings</span>
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action py-2 ripple"
          >
            <i class="fas fa-users fa-fw me-3"></i>
            <span></span>
          </a>
          <a
            href="/Login"
            class="list-group-item list-group-item-action py-2 ripple"
          >
            <i class="fas fa-money-bill fa-fw me-3"></i>
            <span
              onClick={() => {
                window.localStorage.removeItem("token");
              }}
            >
              Logout
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
