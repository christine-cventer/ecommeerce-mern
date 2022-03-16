import React from "react";
import "../styles/running-section.css";

const RunnerSection = ({ leftContent, rightContent }) => {
  return (
    <div className="runningSectionContainer">
      <div className="left-column">{leftContent}</div>
      <div className="right-column">{rightContent}</div>
    </div>
  );
};

export default RunnerSection;
