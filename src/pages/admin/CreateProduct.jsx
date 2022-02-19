import React, { useState, useEffect } from "react";
import { useMutate } from "restful-react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { isUserSignedIn } from "../../authorizations";
import { createProduct } from "./API";

const CreateProduct = () => {
  const { user, token } = isUserSignedIn();
  const userId = isUserSignedIn().user._id;
  const [productImage, setProductImage] = useState();

  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: `http://localhost:8000/api/v1/product/new-product/create/${userId}`,
  });

  useEffect(() => {
    setProductImage({ ...productImage, formData: new FormData() });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    console.log("** event", event.target.files);
    setProductImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!productImage) {
      return;
    }
    const formData = new FormData();
    formData.append("image", productImage);

    uploadImage(formData)
      .then((uploadedImage) => {
        console.log("upload:", uploadedImage);
      })
      .catch((_) => {
        console.log("Oooops, something went wrong!");
      });
  };

  return (
    <Layout title="Create product">
      <input
        onChange={handleChange}
        accept=".jpg, .png, .jpeg"
        className="fileInput mb-2"
        type="file"
      ></input>
      <div>
        <button
          onClick={handleImageUpload}
          disabled={!productImage}
          className="btn btn-primary mb-2"
        >
          Upload
        </button>
      </div>
    </Layout>
  );
};

export default CreateProduct;
