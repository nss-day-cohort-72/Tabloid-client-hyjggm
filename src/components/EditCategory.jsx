import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, updateCategory } from "../managers/CategoryManager";

export default function EditCategory() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCategories().then((categories) => {
            const category = categories.find((c) => c.id === parseInt(id));
            if (category) setName(category.name);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCategory(id, { name }).then(() => navigate("/categories"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Category</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <button type="submit">Save</button>
        </form>
    );
}
