import React from "react";
import logo from "../images/logout.png";
import "../css/nav.css";
import { useEffect } from "react";

function NavBar() {  
  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      window.location.href = "/";
    }

}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.clear();
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ height: "100%" }}
      >
        <h1 className="garamond-text logo">Taalib</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a
              className="nav-item nav-link active garamond-text"
              href="/"
              onClick={() => {
                handleLogout();
              }}
            >
              <div className="garamond-text">
                <h4>Logout</h4>
                <img src={logo} alt="Logout" className="logout-image" />
              </div>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
