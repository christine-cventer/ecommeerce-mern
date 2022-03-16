import React from "react";
import RunnerSection from "../components/RunningSection";
import NavBar from "./Navbar";
import "../styles/homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import MidSectionComponent from "../components/Carousel";

const Homepage = () => {
  const styleContent = (
    <div className="runningSectionHeader">
      <span className="headerLeft">
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <span>
        {" "}
        <p>randomemail@mail.com</p>
      </span>
      <span className="headerLeft">
        {" "}
        <FontAwesomeIcon icon={faPhone} />
      </span>
      <span>
        {" "}
        <p>888-888-8888</p>
      </span>
    </div>
  );

  const rightContent = (
    <div className="runningSectionHeader">
      <span className="headerRight">
        <FontAwesomeIcon icon={faFacebook} />
      </span>
      <span className="headerRight">
        <FontAwesomeIcon icon={faInstagram} />
      </span>
      <span className="headerRight">
        <FontAwesomeIcon icon={faTwitter} />
      </span>
    </div>
  );

  return (
    <>
      <RunnerSection leftContent={styleContent} rightContent={rightContent} />
      <MidSectionComponent />
    </>
  );
};

export default Homepage;
