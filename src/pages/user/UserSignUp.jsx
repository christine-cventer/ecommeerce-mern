import React from "react";
import Layout from "../Layout";
import env from "react-dotenv";

const SignUp = () => <Layout title="Register Page">{env.API_URL}</Layout>;

export default SignUp;
