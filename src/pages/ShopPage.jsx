import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Checkbox from "../components/Checkbox";
import RadioBox from "../components/RadioBox";
import { prices } from "./admin/FixedPrices";
import Card from "react-bootstrap/Card";
import ProductSearch from "../components/Search";
import _ from "lodash";

import { getAllCategoriesForShop, getFilteredProducts } from "./admin/API";

const ShopPage = () => {
  const [categoryFilters, setCategoryFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(10); // defauled limit is ten per backend controller getProductsBySearch
  const [skip, setSkip] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
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
      }
      if (_.isArray(data.data) && !_.isEmpty(data.data)) {
        // console.log(
        //   "*",
        //   data.data.map((datapoint) => datapoint.name)
        // );
        setFilteredResults(data.data);
        setTotalProducts(data.size);
        setSkip(0);
      }
    });
  };

  const loadMoreProducts = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, categoryFilters.filters).then((data) => {
      if (data.error) {
        setError(error);
      }
      if (data.data) {
        setFilteredResults([...filteredResults, ...data.data]);
        setTotalProducts(data.totalProducts);
        setSkip(0);
      }
    });
  };

  const loadMoreBtn = () => {
    return (
      totalProducts > 0 &&
      totalProducts >= limit && (
        <button onClick={loadMoreProducts} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, categoryFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...categoryFilters };
    // filterBy will be either product category or price
    newFilters.filters[filterBy] = filters;
    setCategoryFilters(newFilters);

    const handlePrice = (value) => {
      const data = prices;
      let array = [];
      // loop thru array of prices and check for matching ids
      for (let key in data) {
        if (data[key]._id === parseInt(value)) {
          // recall that the prices are listed as ranges, so we can create an array from the price range
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
        <ProductSearch />
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
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {/*TODO - map entire product. Figure out how to get image in frontend */}
            {_.isArray(filteredResults) &&
              !_.isEmpty(filteredResults) &&
              filteredResults.map((product, key) => (
                <Card>
                  <Card.Body>{product.name}</Card.Body>
                </Card>
              ))}
          </div>
          <hr />
          {loadMoreBtn()}
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
