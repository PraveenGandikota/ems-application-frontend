import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Employee.css"; 

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []); // If you don't need 'employee' in the dependency array, this is correct

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/auth/delete_employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          setEmployee(prevEmployees => prevEmployees.filter(emp => emp.id !== id)); // Update state instead of reloading
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h3>Employee List</h3>
        <Link to="/dashboard/add_employee" className="btn btn-primary">
          + Add Employee
        </Link>
      </div>

      <div className="employee-table-container">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee-image"
                    alt={e.name} // Changed 'Profile' to 'e.name' to make it more meaningful
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>₹ {e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
