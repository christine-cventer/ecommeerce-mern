import React, { useEffect, useState } from "react";
import { getAllCategoriesForShop } from "../pages/admin/API";
import Card from "react-bootstrap/esm/Card";

const ProductSearch = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const loadCategories = () => {
    getAllCategoriesForShop().then((data) => {
      console.log("*category data", data);
      if (data.error) {
        console.log(data.error);
      } else setData({ ...data, categories: data });
    });
  };

  const { categories, category, search, results, searched } = data;
  // get all categories and populate state when component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  const searchForm = () => {
    return (
      <>
        <form onSubmit={searchSubmit}>
          <span className="input-group-text">
            <div className="input-group-lg">
              <div className="input-group-prepend">
                <select
                  className="btn mr-2"
                  onChange={handleChange("category")}
                >
                  <option value="All">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="search"
                className="form-control"
                onChange={handleChange("search")}
                placeholder="Search for products"
              ></input>
            </div>
            <div className="btn input-group-append" style={{ border: "none" }}>
              <button className="input-group-text">Search</button>
            </div>
          </span>
        </form>
        ;
      </>
    );
  };

  const handleChange = () => {};

  const searchSubmit = () => {};
  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
    </div>
  );
};

export default ProductSearch;
