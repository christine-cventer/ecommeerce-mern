import React, { useState } from "react";
import { isUserSignedIn } from "./index";
import { Navigate } from "react-router-dom";

// do not alter
// private routes in v6 accept children as props
function PrivateRoute({ children }) {
  // const [redirectUser, setRedirectUser] = useState({
  //   redirect: false,
  // });
  // TODO : flash a message to let user know access to profile require authorization
  //   const handleIsUserSignedIn = () => {
  //     return setRedirectUser({ redirectUser: true });
  //   };

  //   const redirectMessage = () => {
  //     <div
  //       className="alert alert-info"
  //       style={{ display: redirectUser ? "" : "none" }}
  //     >
  //       Please sign in to view your dashboard.
  //     </div>;
  //   };

  return isUserSignedIn() ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
