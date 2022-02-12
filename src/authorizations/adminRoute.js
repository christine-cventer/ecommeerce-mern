import React, { useState } from "react";
import { isUserSignedIn } from "./index";
import { Navigate } from "react-router-dom";
import { userLogin } from "./index";

// do not alter
function AdminRoute({ children }) {
  //   const [redirectUser, setRedirectUser] = useState({
  //     redirect: false,
  //   });
  // TODO : flash a message to let user know that they must be an admin to access this page
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

  // only admins have a role of 1
  if (isUserSignedIn().user.role === 1) {
    console.log("user is an admin");
  } else {
    console.log("user is not an admin");
  }

  //   console.log(isUserSignedIn.user.name);
  return isUserSignedIn() && isUserSignedIn().user.role === 1 ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default AdminRoute;
