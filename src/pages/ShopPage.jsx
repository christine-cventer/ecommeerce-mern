import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Checkbox from "../components/Checkbox";
import RadioBox from "../components/RadioBox";
import { prices } from "./admin/FixedPrices";

import { getAllCategoriesForShop, getFilteredProducts } from "./admin/API";

const ShopPage = () => {
  const [categoryFilters, setCategoryFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(10); // defualed limit is ten per backend controller getProductsBySearch
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState(false);
  const [filteredResults, setFilteredResults] = useState(0);

  // get categories and assign form data
  const init = () => {
    getAllCategoriesForShop().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(error);
      } else {
        setFilteredResults(data);
      }
    });
  };

  useEffect(() => {
    init();
    // loadFilteredResults(skip, limit, categoryFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...categoryFilters };
    // filterBy will be either category or price
    newFilters.filters[filterBy] = filters;
    setCategoryFilters(newFilters);

    const handlePrice = (value) => {
      const data = prices;
      let array = [];
      // track prices by id and extract array value
      for (let key in data) {
        if (data[key]._id === parseInt(value)) {
          array = data[key].array;
        }
      }
      return array;
    };

    if (filterBy == "price") {
      // extract array value from key
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(categories.filters);
  };

  return (
    <Layout title="Shop Page" description="For all your shopping needs">
      <div className="col-4">
        <h4>Filter by category</h4>
        <div className="row">
          <div className="col-4">
            {" "}
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
          </div>
        </div>
        <div className="col-8">{JSON.stringify(categoryFilters)}</div>

        <h4>Filter by price</h4>
        <div className="row">
          <div className="col-4">
            {" "}
            <ul>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </ul>
          </div>
        </div>
        <div className="col-8">{JSON.stringify(filteredResults)}</div>
      </div>
    </Layout>
  );
};

export default ShopPage;
