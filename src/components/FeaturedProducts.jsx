import React, { useState } from "react";
import { promotionData } from "../helpers/promotionData";
import _ from "lodash";
import "../styles/featured.css";
import sneaker from "../styles/assets/sneaker.jpeg";

const FeaturedProducts = () => {
  return (
    <div className="featuredProductsComponent">
      <div className="featuredProducts">
        <section>
          <h2>Products</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </section>
        {promotionData.map((data, index) => (
          <div
            className="feature"
            style={{
              backgroundImage: `url(${data.image})`,
            }}
          >
            <p>{data.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
