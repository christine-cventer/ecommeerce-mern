import React, { useState, useEffect } from "react";
import _ from "lodash";

const Checkbox = ({ categories, handleFilters }) => {
  const [categorySelected, setCategorySelected] = useState([]);

  const handleToggle = (categoryId) => {
    // check if the category exists in state
    const currentCategoryId = categorySelected.indexOf(categoryId); // returns first index at -1
    const newCategoryId = [...categorySelected];
    // filters are an array of category ids
    // console.log(typeof newCategoryId, categoryId); // logs confirmation of object type and category id
    // i.e check if category is in state, if not, push to state
    if (currentCategoryId === -1) {
      newCategoryId.push(categoryId);
    } else {
      newCategoryId.splice(currentCategoryId, 1); // toggles checkbox selection when user unclicks thereby removing category from state
    }
    // in order to render information on page, there needs to be a check if categoryIds exists
    // without a check, an error is thrown about too many rerenders
    if (_.isArray(newCategoryId) && !_.isEmpty(newCategoryId)) {
      setCategorySelected(newCategoryId);
    }
    handleFilters(newCategoryId);
    // console.log(categoryId);  the ids in these two should match
    // console.log("*", newCategoryId); // should not be empty
  };

  return (
    <>
      {_.isArray(categories) &&
        !_.isEmpty(categories) &&
        categories.map((category, index) => (
          <li className="list-unstyled" key={index}>
            <input
              onChange={() => handleToggle(category._id)}
              type="checkbox"
              name=""
              id=""
              className="form-check-input"
              value={categorySelected.indexOf(category._id === -1)}
            />
            <label htmlFor="" className="form-check-label">
              {category.name}
            </label>
          </li>
        ))}
    </>
  );
};

export default Checkbox;
