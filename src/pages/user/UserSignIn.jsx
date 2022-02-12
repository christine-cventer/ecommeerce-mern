import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../Layout";
import { userLogin, storeUserData } from "../../authorizations";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
  });
  const { email, password, error, loading, redirect } = values;
  const handleChange = (valueType) => (event) => {
    setValues({ ...values, error: false, [valueType]: event.target.value });
  };

  const submitClick = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    userLogin({ email, password }).then((loginData) => {
      console.log("submit click data", loginData);
      if (loginData.error) {
        return setValues({
          ...values,
          error: loginData.errors,
          loading: false,
        });
      } else {
        console.log("user sign in true");
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
    console.log("Redirect true");
    if (redirect) return <Navigate to="/" />;
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
