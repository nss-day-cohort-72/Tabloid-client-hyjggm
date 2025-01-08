import { useEffect, useState } from 'react';
import './Category.css';
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
} from '../../managers/categoryManager';
import { useNavigate } from 'react-router-dom';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });

  const navigate = useNavigate();

  const getAllCategoriesThenSetCategories = () => {
    getAllCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    getAllCategoriesThenSetCategories();
  }, []);

  const handleOnChange = (e) => {
    const copyObj = { ...newCategory };
    copyObj[e.target.name] = e.target.value;
    setNewCategory(copyObj);
  };

  const handleAddBtnClick = () => {
    if (newCategory.name) {
      const categoryToAdd = { ...newCategory }; // Store the current category
      setNewCategory({ name: '' }); // Clear input immediately
      addNewCategory(categoryToAdd).then(() =>
        getAllCategoriesThenSetCategories()
      );
    } else {
      alert('Please enter name');
    }
  };

  const handleEditBtnClick = (id) => {
    navigate(`/categories/${id}`);
  };

  const handleDeleteBtnClick = (id) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this category?'
    );

    if (userConfirmed) {
      deleteCategory(id).then(() => getAllCategoriesThenSetCategories());
    }
  };

  return (
    <div className="category-wrapper">
      <h3>Category Management</h3>
      {categories.map((c) => {
        return (
          <div key={c.id} className="category-card">
            <div className="category-name-wrapper">
              <p>{c.name}</p>
            </div>
            <div className="button-wrapper">
              <button onClick={() => handleEditBtnClick(c.id)}>Edit</button>
              <button onClick={() => handleDeleteBtnClick(c.id)}>Delete</button>
            </div>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          name="name"
          id="category"
          value={newCategory.name}
          placeholder="Add category"
          onChange={handleOnChange}
        />
        <button onClick={handleAddBtnClick}>Add</button>
      </div>
    </div>
  );
};
