import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getAllProducts } from "./admin/API";
import ProductCard from "../components/Product";
import _ from "lodash";

const HomePage = () => {
  const [productsSold, setProductsSold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const returnProductsSold = () => {
    getAllProducts("sold").then((productSoldData) => {
      if (productSoldData.error) {
        setError(productSoldData.error);
      } else setProductsSold(productSoldData);
    });
  };

  const returnProductsByArrival = () => {
    getAllProducts("createdAt").then((productArrivalData) => {
      if (productArrivalData.error) {
        setError(productArrivalData.error);
      } else setProductsByArrival(productArrivalData);
    });
  };

  // run both functions when component mounts to track changes in state
  useEffect(() => {
    returnProductsSold();
    returnProductsByArrival();
  }, []);

  return (
    <Layout title="Homepage" description="E-commerce app">
      <h2 className="mb-4">Favorites</h2>
      {_.isArray(productsSold.products) &&
        !_.isEmpty(productsSold.products) &&
        productsSold.products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}

      <h2>Arrivals</h2>
      <p>product arrival data goes here</p>
    </Layout>
  );
};

export default HomePage;
