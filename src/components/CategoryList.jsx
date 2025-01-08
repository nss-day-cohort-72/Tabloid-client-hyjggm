import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../managers/CategoryManager";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = () => {
        getCategories().then(setCategories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteCategory(id).then(fetchCategories);
        }
    };

    return (
        <div>
            <h2>Category Management</h2>
            <button onClick={() => navigate("/category/new")}>Create Category</button>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => navigate(`/category/edit/${category.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
