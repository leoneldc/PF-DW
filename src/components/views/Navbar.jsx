import React from "react";
import { NavLink } from "react-router-dom";
import {LOGOUT, HOME, NEWFOTO, USERS} from '../../config/routes/paths'
import "../styles/Navbar.css";

function Navbar(params) {
  function btnMenu() {}

  return (
      <header id="navbar">
        <nav className="navbar-container containerNavBar">
          <NavLink className="home-link" to={HOME}>FAKEGRAM</NavLink>
          <button
            type="button"
            id="navbar-toggle"
            aria-controls="navbar-menu"
            aria-label="Toggle menu"
            aria-expanded="false"
            onClick={() => {
              const navbarToggle = document.querySelector("#navbar-toggle");
              let isNavbarExpanded =
                navbarToggle.getAttribute("aria-expanded") === "true";
              const toggleNavbarVisibility = () => {
                isNavbarExpanded = !isNavbarExpanded;
                navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
              };
              toggleNavbarVisibility();
            }}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div
            id="navbar-menu"
            aria-labelledby="navbar-toggle"
          >
            <ul className="navbar-links">
              <li className="navbar-item">
                  <NavLink className="navbar-link" to={NEWFOTO}>SUBIR IMAGEN</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink className="navbar-link" to={USERS}>USUARIOS</NavLink>
              </li>
              <li className="navbar-item">
                  <NavLink className="navbar-link" to={LOGOUT}>LOGOUT</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
  );
}

export default Navbar;
