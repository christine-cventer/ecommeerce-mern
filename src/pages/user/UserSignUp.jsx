import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { userRegister } from "../../authorizations";
import "../../styles/auth.css";
import model from "../../styles/assets/model.jpeg";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, success, error } = values;
  const handleChange = (valueType) => (event) => {
    setValues({ ...values, error: false, [valueType]: event.target.value });
  };

  const submitClick = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    userRegister({ name, email, password }).then((data) => {
      //   console.log("data", data.errors);
      if (data.errors) {
        return setValues({ ...values, error: data.errors, success: false });
      } else {
        return setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: false,
          success: true,
        });
      }
    });
  };

  const errorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {`Sign up error: ${JSON.stringify(error)}`}
    </div>
  );
  const successMessage = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account created. Please <Link to="/login">Sign in</Link>.
    </div>
  );

  return (
    <>
      {errorMessage()}
      {successMessage()}
      <div className="row">
        <div class="left-column column">
          <div className="img-container">
            <img src={model} />
          </div>
        </div>
        <div class="right-column column">
          {" "}
          <form action="#">
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                onChange={handleChange("name")}
                type="text"
                className="form-control"
                value={name}
              />
            </div>
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
        </div>
      </div>

      {/* {JSON.stringify(values)} */}
    </>
  );
};

export default SignUp;
