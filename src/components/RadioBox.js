import React, { useState, useEffect } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  // only one price can be selected at a time
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(value);
  };

  return prices.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        type="radio"
        name={price}
        id=""
        className="form-check-input"
        value={`${price._id}`}
        className="mr-2 ml-4"
      />
      <label htmlFor="" className="form-check-label">
        {price.name}
      </label>
    </div>
  ));
};

export default RadioBox;
