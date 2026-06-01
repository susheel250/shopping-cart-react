import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import api from "../services/api";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",

        formData,
      );

      localStorage.setItem(
        "token",

        response.data.token,
      );

      localStorage.setItem("name", response.data.user.name);

       toast.success("Login Successful");

      navigate("/products");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Login Failed",
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        <p className="auth-subtitle">Welcome Back</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
