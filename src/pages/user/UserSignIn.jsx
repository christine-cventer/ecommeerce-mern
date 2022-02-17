import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import { userLogin, storeUserData, isUserSignedIn } from "../../authorizations";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
  });
  const { email, password, error, loading, redirect } = values;
  const { user } = isUserSignedIn();
  // accepts form data
  const handleChange = (valueType) => (event) => {
    setValues({ ...values, error: false, [valueType]: event.target.value });
  };

  const submitClick = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    userLogin({ email, password }).then((loginData) => {
      // console.log("login click data", loginData);
      if (loginData.errors) {
        return setValues({
          ...values,
          error: loginData.errors,
          loading: false,
        });
      } else {
        console.log("user sign in true", loginData);
        storeUserData(loginData, () => {
          setValues({
            ...values,
            redirect: true,
          });
        });
      }
    });
  };

  const errorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      Sign in error: {error}
    </div>
  );
  const loadingMessage = () =>
    loading && (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    // console.log("Redirect true");
    if (redirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/profile" />;
      }
    }
    // if (isUserSignedIn()) {
    //   return <Navigate to="/home" />;
    // }
  };

  return (
    <Layout title="Signin Page" className="container col-md-8 offset-md-2">
      {errorMessage()}
      {loadingMessage()}
      {redirectUser()}
      <form action="#">
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={submitClick} className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default SignIn;
