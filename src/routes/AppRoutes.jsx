import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route path="/products" element={<Products />} />

      <Route path="/cart" element={<h1>Cart Page</h1>} />

      <Route path="/orders" element={<h1>Orders Page</h1>} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default AppRoutes;
