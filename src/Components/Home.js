import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdminRecords();
    fetchAdminCount();
    fetchEmployeeCount();
    fetchSalaryTotal();
  }, []);

  const fetchAdminRecords = async () => {
    try {
      const result = await axios.get('http://localhost:5000/auth/admin_records');
      if (result.data.Status) setAdmins(result.data.Result);
    } catch (error) {
      console.error("Error fetching admin records:", error);
    }
  };

  const fetchAdminCount = async () => {
    try {
      const result = await axios.get('http://localhost:5000/auth/admin_count');
      if (result.data.Status) setAdminTotal(result.data.Result[0].admin);
    } catch (error) {
      console.error("Error fetching admin count:", error);
    }
  };

  const fetchEmployeeCount = async () => {
    try {
      const result = await axios.get('http://localhost:5000/auth/employee_count');
      if (result.data.Status) setEmployeeTotal(result.data.Result[0].employee);
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  const fetchSalaryTotal = async () => {
    try {
      const result = await axios.get('http://localhost:5000/auth/salary_count');
      if (result.data.Status) setSalaryTotal(result.data.Result[0].salaryOFEmp);
    } catch (error) {
      console.error("Error fetching salary total:", error);
    }
  };

  return (
    <div className="home-dashboard-container">
      <h1 className="home-dashboard-title">Dashboard</h1>
      
      <div className="home-stats-container">
        <div className="home-stat-card">
          <h3>Total Admins</h3>
          <p>{adminTotal}</p>
        </div>
        <div className="home-stat-card">
          <h3>Total Employees</h3>
          <p>{employeeTotal}</p>
        </div>
        <div className="home-stat-card">
          <h3>Total Salary</h3>
          <p>${salaryTotal}</p>
        </div>
      </div>
      
      <div className="home-admin-list">
        <h2>Admin List</h2>
        <table className="home-admin-table">
          <thead>
            <tr>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;