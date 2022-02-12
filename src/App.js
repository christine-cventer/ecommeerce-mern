import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePageRoute from "./pages/routes/HomePageRoute";
import SignInRoute from "./pages/routes/UserSignInRoute";
import SignUpRoute from "./pages/routes/RegisterRoute";
import SignOutRoute from "./pages/routes/SignOutRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageRoute />} />
        {/* <Route path="/pricing" element={<PricingRoute />} />
        <Route path="/faq" element={<FAQRoute />} />
        <Route path="/contact" element={<ContactForm />} /> */}
        <Route path="/login" element={<SignInRoute />} />
        <Route path="/register" element={<SignUpRoute />} />
        <Route path="/signout" element={<SignOutRoute />} />
      </Routes>
    </>
  );
}

export default App;
