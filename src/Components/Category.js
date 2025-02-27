import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const [category, setCategory] = useState([]);

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

  return (
    <div className="category-container">
      <div className="category-header">
        <h3>Category List</h3>
        <Link to="/dashboard/add_category" className="btn btn-success">
          + Add Category
        </Link>
      </div>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th> Category Name</th>
              </tr>
            </thead>
            <tbody>
              {category.length > 0 ? (
                category.map((c, index) => (
                  <tr key={index}>
                    <td>{c.category_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-muted">No Categories Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;