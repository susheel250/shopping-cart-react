import { useState } from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import { toast } from "react-toastify";

import api from '../services/api';

import './Auth.css';

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: '',

      email: '',

      password: ''

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(

        '/auth/register',

        formData

      );

      toast.success("Registration Successful");

      navigate('/login');

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.error ||

        error.response?.data?.message ||

        'Registration Failed'

      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>
          Create Account
        </h1>

        <p className="auth-subtitle">

          Register to continue shopping

        </p>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Email
            </label>

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

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength="6"
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
          >

            Register

          </button>

        </form>

        <p className="auth-footer">

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;