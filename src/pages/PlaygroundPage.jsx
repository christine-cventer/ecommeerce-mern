import React from "react";
import RunnerSection from "../components/RunningSection";
import "../styles/playground.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const PlaygroundPage = () => {
  const styleContent = (
    <div className="runningSectionHeader headerLeft">
      <span>
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <span>
        {" "}
        <p>randomemail@mail.com</p>
      </span>
      <span>
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
    <div className="runningSectionHeader headerRight">
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
    <RunnerSection leftContent={styleContent} rightContent={rightContent} />
  );
};

export default PlaygroundPage;
