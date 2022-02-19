import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";

const CreateProduct = () => {
  const { user, token } = isUserSignedIn();
  const product = {
    name: "",
    description: "",
    price: "",
    category: [],
    quantity: "",
    productSold: "",
    shipping: "",
    file: "",
    cloudinary_id: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectAdmin: false,
    formData: "",
  };
  const [values, setValues] = useState([product]);
  // destructure values from state
  const {
    name,
    description,
    price,
    category,
    quantity,
    productSold,
    shipping,
    file,
    cloudinary_id,
    loading,
    error,
    createdProduct,
    redirectAdmin,
    formData,
  } = values;

  // access form data whenever value changes
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  // populate form data with whatever is in state
  // form data then gets sent to backend
  // Create an HOC that grabs name, then event as arguments and assigns to a value
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files : event.target.value;
    // assign corresponding value to formData field
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted", event.target.value);
  };

  return (
    <Layout title="Create product">
      <div className="createProduct">
        <form onSubmit={clickSubmit}>
          <div className="form-group">
            <label htmlFor="" className="btn btn-secondary">
              <input
                type="file"
                className="form-control"
                onChange={handleChange("image")}
                name="image"
                accept="image/*"
                onChange={handleChange("image")}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={handleChange("description")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Quantity</label>
            <input type="number" className="form-control" value={quantity} />
          </div>
          <div className="form-group">
            <label htmlFor="">Price</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={handleChange("price")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Category</label>
            <select
              className="form-control"
              onChange={handleChange("category")}
            >
              <option value="">New product</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Shipping</label>
            <select
              className="form-control"
              onChange={handleChange("description")}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <button className="btn btn-outline-primary">Create Product</button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProduct;
