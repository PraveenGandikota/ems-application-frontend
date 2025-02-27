import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./Dashboard.css";  // Import the external CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
  const handleLogout = () => {
    axios.get("http://localhost:5000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/adminlogin");
      }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link to="/dashboard" className="sidebar-header">
          <span className="sidebar-title">GVK</span>
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/dashboard">
              <i className="bi bi-speedometer2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/employee">
              <i className="bi bi-people"></i> Manage Employees
            </Link>
          </li>
          <li>
            <Link to="/dashboard/category">
              <i className="bi bi-columns"></i> Category
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile">
              <i className="bi bi-person"></i> Profile
            </Link>
          </li>
          <li onClick={handleLogout} className="logout">
            <Link>
              <i className="bi bi-power"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h4>Employee Management System</h4>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
