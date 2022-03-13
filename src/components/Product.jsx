import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="col-4 mb-3">
    <div className="card">
      <div className="card-header">{product.name}</div>
      <div className="card-body">
        <p>{product.description}</p>
        <Link to="#">
          <button className="btn btn-outline-primary">View product</button>
        </Link>
        <button className="btn btn-outline-warning">Add to cart</button>
      </div>
    </div>
  </div>
);

export default ProductCard;
