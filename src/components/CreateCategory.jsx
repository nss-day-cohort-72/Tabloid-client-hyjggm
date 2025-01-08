import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../managers/CategoryManager";

export default function CreateCategory() {
    console.log("CreateCategory component is rendering");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory({ name }).then(() => navigate("/categories"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Category</h2>
            <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <button type="submit">Save</button>
        </form>
    );
}
