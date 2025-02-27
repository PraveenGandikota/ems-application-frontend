import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!employee.name.trim()) newErrors.name = "Name is required";
    if (!employee.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(employee.email)) newErrors.email = "Invalid email format";
    if (!employee.password.trim()) newErrors.password = "Password is required";
    if (!employee.salary.trim()) newErrors.salary = "Salary is required";
    else if (!/^\d+$/.test(employee.salary)) newErrors.salary = "Salary must be a number";
    if (!employee.address.trim()) newErrors.address = "Address is required";
    if (!employee.category_id) newErrors.category_id = "Please select a category";
    if (!employee.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("salary", employee.salary);
    formData.append("image", employee.image);
    formData.append("category_id", employee.category_id);

    axios
      .post("http://localhost:5000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          
          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-0"
              placeholder="Enter Password"
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          
          <div className="col-12">
            <label className="form-label">Salary</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
            {errors.salary && <p className="text-danger">{errors.salary}</p>}
          </div>
          
          <div className="col-12">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </div>
          
          <div className="col-12">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
              required
            >
              <option value="">Select a Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.category_name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-danger">{errors.category_id}</p>}
          </div>
          
          <div className="col-12 mb-3">
            <label className="form-label">Select Image</label>
            <input
              type="file"
              className="form-control rounded-0"
              onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
            />
            {errors.image && <p className="text-danger">{errors.image}</p>}
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;