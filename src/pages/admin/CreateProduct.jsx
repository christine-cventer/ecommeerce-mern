import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";
import { createProduct, getAllCategories } from "./API";

const CreateProduct = () => {
  const { user, token } = isUserSignedIn();

  const product = {
    name: "",
    description: "",
    price: "",
    category: [],
    category: "",
    quantity: "",
    productSold: "",
    shipping: "",
    file: "",
    cloudinary_id: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToAdminPage: false,
    formData: "",
  };

  const [values, setValues] = useState({ product });

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    shipping,
    formData,
    success,
    loading,
    error,
    createdProduct,
  } = values;

  // get categories and assign form data
  const init = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  // update state and populate formData
  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    if (event.target.files) {
      console.log("image found", event.target.files);
    }
    if (name === "image") {
      console.log("image", event.target.files[0]);
    }

    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
    formData.set(name, value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      console.log("*** data", JSON.stringify(data.newProduct));
      // console.log("*** formdata", JSON.stringify(formData));

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          quantity: "",
          shipping: "",
          file: " ",
          loading: false,
          success: true,
          createdProduct: data.name,
          formData: "",
          cloudinary_id: "",
        });
      }
    });
  };

  const loadingMessage = () => {
    loading && <div className="alert alert-success">Loading...</div>;
  };

  const errorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {`Create product error: ${JSON.stringify(error)}`}
    </div>
  );
  const successMessage = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New product creation <Link to="/admin/dashboard">Back to dashboard</Link>
    </div>
  );

  return (
    <Layout title="Create product">
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      <form onSubmit={clickSubmit}>
        <input
          onChange={handleChange("image")}
          accept=".jpg, .png, .jpeg"
          className="fileInput mb-2"
          name="image"
          type="file"
        ></input>
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
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Category</label>
          <select className="custom-select" onChange={handleChange("category")}>
            <option>Please select a category</option>
            {categories &&
              categories.map((category, index) => (
                <option value={category._id} key={index}>
                  {" "}
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="">Shipping</label>

          <select name="cars" id="cars">
            <option value="0">Shipping option</option>
            <option value="0">Yes</option>
            <option value="1">No</option>
          </select>
        </div>
        <div>
          <button
            // disabled={!productImage}
            className="btn btn-primary mb-2"
          >
            Upload
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateProduct;
