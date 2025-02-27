import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const[error, setError] = useState(null)
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/auth/adminlogin', values)
      .then((result) => {
        if(result.data.loginStatus){
          navigate('/dashboard');
        } else{
          setError(result.data.Error)
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center loginPage pre-page">
      <div className="stars"></div>
      <div className="p-3 rounded border loginForm">
        <div className="logo-container">
          <img src="/Images/logo.png" alt="Logo" className="logopg" />
          <h1 className='welcome-heading'>Welcome to PG</h1>
        </div>
        <p className="heddfiv">Please Login to Continue</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Email Address"
              className="form-control bar"
              required
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="form-control bar"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <i
              className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <button className="btn btn-success rounded-10">Login</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;