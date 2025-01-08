import { useEffect, useState } from 'react';
import './Category.css';
import { getAllCategories } from '../../managers/categoryManager';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className="category-wrapper">
      <h3>Category Management</h3>
      {categories.map((c) => {
        return (
          <div className="category-card">
            <div className="category-name-wrapper">
              <p>{c.name}</p>
            </div>
            <div className="button-wrapper">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          name="name"
          id="category"
          placeholder="Add category"
        />
        <button>Add</button>
      </div>
    </div>
  );
};
