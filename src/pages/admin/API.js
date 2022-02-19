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

export const createProduct = (userId, token, product) => {
  console.log("hit endpoint", product);
  return fetch(
    `http://localhost:8000/api/v1/product/new-product/create/${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: product,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return "Create product error", error.Message;
    });
};
