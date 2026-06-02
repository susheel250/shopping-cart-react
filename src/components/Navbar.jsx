import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

import { useEffect, useState } from "react";

import { getCartCount } from "../services/cartService";

import { useCart } from "../context/CartContext";

import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const { cartCount, setCartCount } = useCart();

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await getCartCount();

        setCartCount(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartCount();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setCartCount(0);
    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Shopping Cart</Link>
      </div>

      <div className="nav-links">

        <Link to="/products">Products</Link>
        <Link to="/address">Addresses</Link>

        {token && (
          <>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart />

              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            <Link to="/orders">Orders</Link>
          </>
        )}
      </div>

      <div className="auth-links">
        {token ? (
          <div className="user-section">
            <span className="user-name">Hi, {name}</span>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
