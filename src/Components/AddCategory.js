import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCategory.css"; 

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-category-container">
      <div className="add-category-box">
        <h2 className="text-center">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category Name:</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;