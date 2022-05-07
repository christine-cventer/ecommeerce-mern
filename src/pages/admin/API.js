import queryString from "query-string";
export const createCategory = (userId, token, category) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/category/create/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return "Create category error", error.Message;
    });
};

export const createProduct = (userId, token, productFormData) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/product/new-product/create/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: productFormData,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return "Create product error", error.Message;
    });
};

export const getAllCategories = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/get-category-by-id/get-all-categories`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return "Get product categories error", error;
    });
};

export const getAllProducts = (sortBy) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/get-products-sold/get-products-sold?sortBy=createdAt&order=desc&limit=4`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      // console.log("categories", response);
      return response.json();
    })
    .catch((error) => {
      return "Get product categories error", error.Message;
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/get-product-by-id/get-product/search`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return "Create category error", error.Message;
    });
};

// params are category id or search term
export const listProductsFromSearch = (params) => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/get-product/search?${query}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      // console.log("cproducts", response);
      return response.json();
    })
    .catch((error) => {
      return "Get product error", error;
    });
};
