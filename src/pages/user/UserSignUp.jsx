import React, { useState } from "react";
import Layout from "../Layout";
// import env from "react-dotenv";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const handleChange = (valueType) => (event) => {
    setValues({ ...values, error: false, [valueType]: event.target.value });
  };
  return (
    {
      /* let's create a 12 column grid */
    },
    (
      <Layout title="Register Page" className="container col-md-8 offset-md-2">
        <form action="#">
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
        {/* {JSON.stringify(values)} */}
      </Layout>
    )
  );
};

export default SignUp;
