import React, { useState } from "react";
import { useMutate } from "restful-react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";
import { createProduct } from "./API";

const CreateProduct = () => {
  // const { user, token } = isUserSignedIn();
  // const [image, setImage] = useState();

  // const { mutate: uploadImage } = useMutate({
  //   verb: "POST",
  //   path: "image-upload",
  // });
  // // const [previewSource, setPreviewSource] = useState();
 
  // const [values, setValues] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   category: [],
  //   quantity: "",
  //   productSold: "",
  //   shipping: "",
  //   file: "",
  //   cloudinary_id: "",
  //   loading: false,
  //   error: "",
  //   createdProduct: "",
  //   redirectAdmin: false,
  //   // formData: "",
  // });
  //  destructure values from state


  // access form data whenever value changes
  // useEffect(() => {
  //   setValues({ ...values, formData: new FormData() });
  // }, []);

  // populate form data with whatever is in state
  // form data then gets sent to backend
  // Create an HOC that grabs name, then event as arguments and assigns to a value
  // const handleChange = (name) => (event) => {
  //   const value = name === "image" ? event.target.files : event.target.value;
  // assign corresponding value to formData field
  // formData.set(name, value);
  //   setValues({ ...values, [name]: value });
  //   setImage(event.target.files);
  // };

  // const imagePreview = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  // const clickSubmit = (event) => {
  //   event.preventDefault();
  //   if (!image) {
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   setValues({ ...values, error: "", loading: true });
  //   createProduct(user._id, token, formData).then((data) => {
  //     console.log("**", formData);
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({
  //         ...values,
  //         name: "",
  //         description: "",
  //         price: "",
  //         quantity: "",
  //         category: "",
  //         file: "",
  //         cloudinary_id: "",
  //         loading: false,
  //         createdProduct: data.name,
  //       });
  //     }
  //   });
  // };

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
    // redirectAdmin: false,
    // formData: "",
  };

  const {
    name,
    description,
    price,
    category,
    quantity,
    shipping,
    file,
    cloudinary_id,
    loading,
    error,
    createdProduct,
    redirectAdmin,
    // formData,
  } = values;

  const [file, setFile] = useState();
  const [values, setValues] = useState("");

  const submit = async e =>{
    e.preventDefault()

    const formData = new FormData()
    formData.append("image", file)
    formData.append(product, values)

    const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    console.log(result.data)
  }


  }
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
              value={price}
              onChange={handleChange("price")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Category</label>
            <select
              className="custom-select"
              onChange={handleChange("category")}
            >
              <option value="611c4b87d455c27134b21bc3">New product</option>
              <option value="611c4b87d455c27134b21bd3">
                New product another
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Shipping</label>

            <select name="cars" id="cars">
              <option value="0">Yes</option>
              <option value="1">No</option>
            </select>
          </div>
          <button className="btn btn-outline-primary" type="submit">
            Create Product
          </button>
        </form>
        {/* {previewSource && <img src={previewSource} alt="selected image" />} */}
      </div>
    </Layout>
  );
};

export default CreateProduct;
