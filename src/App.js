import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePageRoute from "./pages/routes/HomePageRoute";
import SignInRoute from "./pages/routes/UserSignInRoute";
import SignUpRoute from "./pages/routes/RegisterRoute";
import SignOutRoute from "./pages/routes/SignOutRoute";
import PrivateRoute from "./authorizations/privateRoutes";
import AdminDashboardRoute from "./pages/routes/AdminDashboardRoute";
import UserDashboard from "./pages/routes/PrivateRoutes";
import AdminRoute from "./authorizations/adminRoute";
import CreateCategoryRoute from "./pages/routes/CreateCategoryRoute";
import CreateProductRoute from "./pages/routes/CreateProduct";

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
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardRoute />
            </AdminRoute>
          }
        />
        <Route
          path="/create/category"
          element={
            <AdminRoute>
              <CreateCategoryRoute />
            </AdminRoute>
          }
        />
        <Route
          path="/create/product"
          element={
            <AdminRoute>
              <CreateProductRoute />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
