import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import Logo from "./assets/logo.jpeg";
import "../styles/NavBarStyles.css";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
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
          <li className="nav-item">
            <Link to="/login">Sign in</Link>
          </li>
          <li className="nav-item">
            <Link to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/faq">FAQ</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
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
