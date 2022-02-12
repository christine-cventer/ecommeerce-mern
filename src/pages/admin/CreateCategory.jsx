import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";

export default function CreateCategory() {
  const { name, setName } = useState("");
  const { error, setError } = useState(false);
  const { success, setSuccess } = useState(false);

  const { user, token } = isUserSignedIn();

  // grab what user is typing and set state
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // send request to backend to create the category
  };
  return (
    <Layout title="Create category">
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
            <button className="btn btn-outlint-primary">Create Category</button>
          </div>
        </form>
        ;
      </div>
    </Layout>
  );
}
