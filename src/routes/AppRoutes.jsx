import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Address from "../pages/Address";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route path="/products" element={<Products />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/orders" element={<Orders />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/address" element={<Address />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
