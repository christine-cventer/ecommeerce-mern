import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import Logo from "./assets/logo.jpeg";
import "../styles/NavBarStyles.css";
// import { userSignOut } from "../index";
import { useNavigate } from "react-router-dom";
import { userSignOut, isUserSignedIn } from "../authorizations/index";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  // Let's add redirect logic with react router v6
  let navigate = useNavigate();
  function redirectToHome() {
    console.log("user signed out");
    return userSignOut(() => navigate("/"));
  }

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Logo goes here</Link>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          {!isUserSignedIn() && (
            <div>
              <li className="nav-item">
                <Link to="/login">Sign in</Link>
              </li>
            </div>
          )}
          <li className="nav-item">
            <Link to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/faq">FAQ</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>

          {isUserSignedIn() && isUserSignedIn().user.role === 0 && (
            <li className="nav-item">
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {/* only admins may access this page & */}
          {isUserSignedIn() && isUserSignedIn().user.role === 1 && (
            <li className="nav-item">
              <Link to="/admin/dashboard">Admin</Link>
            </li>
          )}
          {isUserSignedIn() && (
            <div>
              <li className="nav-item">
                <Link to="/signout">
                  <span onClick={() => redirectToHome()}> Signout </span>
                </Link>
              </li>
            </div>
          )}
        </ul>
        {/* for ui between desktop/mobile views
        reveals nav menu when clicked in mobile version */}
        <div className="menu-btn" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} style={{ color: "#fff" }} />
          ) : (
            <FaBars size={20} style={{ color: "#fff" }} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
