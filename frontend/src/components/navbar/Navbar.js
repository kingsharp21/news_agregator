import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Customise from "../customise/Customise";
import "./Navbar.css";
// import './App.css';
function Navbar() {
  const navigate = useNavigate();
  const [customise_setting, setCustomise_setting] = useState("hidden");
  const openPop = () => {
    setCustomise_setting("visible");
  };

  const closePop = () => {
    setCustomise_setting("hidden");
  };

  const logOut = () => {
    localStorage.clear()
    navigate("/login");
  }

  return (
    <>
      <Customise visibility={customise_setting} close={closePop} />
      <nav className="navbar navbar-default flex">
        <div className="container flex">
          <div className="logo-section">
            <span>Harp</span>
          </div>
          {/* <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div> */}
          <div className="profile-section flex">
            <button className="flex" onClick={openPop}>
              {" "}
              <i class="fa fa-sliders" aria-hidden="true"></i>
              Preference
            </button>
            <button className="logout" onClick={logOut}>
              Logout
            </button>
            <p className="user-name">{localStorage.getItem("user")}</p>
            <i class="fa fa-user" aria-hidden="true"></i>
          </div>
          {/* <div className="profile-section flex">
         
        </div> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
