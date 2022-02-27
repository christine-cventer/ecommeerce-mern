import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";
import { createCategory } from "./API";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isUserSignedIn();

  // grab what user is typing and set state
  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    // send request to backend to create the category
    createCategory(user._id, token, { name }).then((data) => {
      // console.log("*** data", data.category.name);
      // if (data.category.name) {
      //   setError("A category with this name already exists");
      // }
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <h3 className="text-success">
          A category has been created for {name} Please{" "}
          <Link to="/admin/dashboard">Back to dashboard</Link>
        </h3>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      console.log("create category error", error);
      return (
        <h3 className="text-danger">
          A category with this name already exists
        </h3>
      );
    }
  };

  return (
    <Layout title="Create category">
      {successMessage()}
      {errorMessage()}
      {/* {directLink()} */}
      <div className="createCategory">
        <form onSubmit={clickSubmit}>
          <div className="form-group">
            <label htmlFor="" className="text-muted">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={name}
              autoFocus
            />
          </div>
          <button className="btn btn-outlint-primary">Create Category</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCategory;
