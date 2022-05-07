export const userRegister = (userData) => {
  console.log("values:", { userData });
  //TODO: change to axios because apparently using the fetch module is not as safe (see npm audit logs)
  return fetch(`${process.env.API_URL}/v1/user/signup`, {
    // method
    // request headers
    //request body
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      // console.log("res", response.json());
      return response.json(userData);
    })
    .catch((error) => {
      return `Sign up error: ${JSON.stringify(error)}`;
    });
};
export const userLogin = (userData) => {
  return fetch(`${process.env.API_URL}/v1/user/signin`, {
    // method
    // request headers
    //request body
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      // it is understandable to want to see the response data
      // but response data may only be consumed once
      // so logging it AND returning it will raise an error
      // console.log("signin response", response.json());
      return response.json(userData);
    })
    .catch((error) => {
      console.log(error);
    });
};

// store user data in local storage
export const storeUserData = (userData, callback) => {
  // first check that you are running in a webpage
  if (typeof (window !== "undefined")) {
    localStorage.setItem("token", JSON.stringify(userData));
    callback();
  }
};

// remove token from local storage
// make request to backend
// redirect user to some page by passing a function to callback
export const userSignOut = (callback) => {
  if (typeof (window !== "undefined")) {
    localStorage.removeItem("token");
    callback();

    return fetch(`${process.env.API_URL}/v1/user/signout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log("res", response.json());
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        return `Error logging out: ${error}`;
      });
  }
};

// Let's reveal certain links depending if the user is signed in out not
export const isUserSignedIn = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};
