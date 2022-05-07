import React, { useEffect, useState } from "react";
import { getAllCategories, listProductsFromSearch } from "../pages/admin/API";
import Card from "react-bootstrap/esm/Card";
import _ from "lodash";

const ProductSearch = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const loadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error); // TODO find a better way to provide error handling
      } else setData({ ...data, categories: data.productCategories });
    });
  };

  // destructuring allows us to get all categories
  const { categories, category, search, results, searched } = data;
  // get all categories and populate state when component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (name) => (event) => {
    // name can be either category or the search term based on the target value
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchData = () => {
    console.log("search data", search, category);
    if (search) {
      listProductsFromSearch({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (data.error) {
          console.log("Error getting products from search");
        } else {
          setData({ ...data, results: data, searched: true });
        }
      });
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  // set default value for results in case there are no results in state
  const searchedProducts = (results = []) => {
    return (
      <div className="row">
        {_.isArray(results) &&
          !_.isEmpty(results) &&
          results.map((product, index) => (
            <Card key={index} product={product} />
          ))}
      </div>
    );
  };

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
                  {_.isArray(categories) &&
                    !_.isEmpty(categories) &&
                    categories.map((category, index) => (
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
      </>
    );
  };

  return (
    <div className="row">
      <div className="container">
        {searchForm()}
        {/* {JSON.stringify(results)} */}
        <div className="container-fluid mb-3">{searchedProducts(results)}</div>
      </div>
    </div>
  );
};

export default ProductSearch;
