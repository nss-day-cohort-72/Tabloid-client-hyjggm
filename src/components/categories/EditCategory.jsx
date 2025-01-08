import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editCategory, getCategoryById } from '../../managers/categoryManager';

export const EditCategory = () => {
  const [category, setCategory] = useState({});
  const { categoryId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById(categoryId).then((data) => setCategory(data));
  }, [categoryId]);

  const handleOnChange = (e) => {
    const copyObj = { ...category };
    copyObj[e.target.name] = e.target.value;

    setCategory(copyObj);
  };

  const handleSaveBtnClick = (e) => {
    e.preventDefault();
    if (category.name) {
      editCategory(categoryId, category).then(() => navigate('/categories'));
    } else {
      alert('Please enter a category name');
    }
  };

  return (
    <form>
      <label>Category Name:</label>
      <input
        type="text"
        value={category.name ? category.name : ''}
        name="name"
        onChange={handleOnChange}
      />
      <button onClick={handleSaveBtnClick}>Save</button>
    </form>
  );
};
