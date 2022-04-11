import React from "react";
import "../styles/auth.css";

const AuthFrom = ({
  leftColumn,
  rightColumn,
  successMessage,
  errorMessage,
}) => {
  return (
    <div className="row">
      {successMessage}
      {errorMessage}
      <div className="left-column column">{leftColumn}</div>
      <div className="right-column column">{rightColumn}</div>
    </div>
  );
};

export default AuthFrom;
