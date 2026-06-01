import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Shopping Cart</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {token && (
          <>
            <Link to="/cart">Cart</Link>

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
