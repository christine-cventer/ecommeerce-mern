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
      console.log("create category error", error.Message);
    });
};

export default createCategory;
