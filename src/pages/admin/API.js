import env from "react-dotenv";

export const createCategory = (userId, token, category) => {
  // console.log("create category values:", { userId, token, category });
  return fetch(`${env.API_URL}/v1/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return "Create category error", error.Message;
    });
};

export const createProduct = (userId, token, productFormData) => {
  return fetch(`${env.API_URL}/v1/product/new-product/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: productFormData,
  })
    .then((response) => {
      // console.log("product form data", response);
      return response.json();
    })
    .catch((error) => {
      return "Create product error", error.Message;
    });
};

export const getAllCategories = () => {
  return fetch(`${env.API_URL}/v1/get-category-by-id/get-all-categories`, {
    method: "GET",
  })
    .then((response) => {
      // console.log("categories", response);
      return response.json();
    })
    .catch((error) => {
      return "Get product categories error", error.Message;
    });
};
export const getAllProducts = (sortBy) => {
  return fetch(
    `${env.API_URL}/v1/get-products-sold/get-products-sold?sortBy=createdAt&order=desc&limit=4`,
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
