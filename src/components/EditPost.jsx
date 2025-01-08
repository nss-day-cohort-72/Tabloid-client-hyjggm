import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../managers/PostManager";
import { getCategories } from "../managers/CategoryManager";

export default function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]); // State to store categories
    const navigate = useNavigate();

    // Fetch post data for editing
    useEffect(() => {
        getPostById(id)
            .then((data) => {
                console.log("Fetched post for editing:", data);
                setPost(data);
            })
            .catch((err) => alert(err.message));
    }, [id]);

    // Fetch all categories
    useEffect(() => {
        getCategories()
            .then((data) => {
                console.log("Fetched categories:", data);
                setCategories(data);
            })
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePost(id, post)
            .then(() => navigate(`/posts/${id}`))
            .catch((err) => alert(err.message));
    };

    if (!post || categories.length === 0) return <p>Loading...</p>; // Ensure both post and categories are loaded

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
            />
            <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                required
            />
            <select
                value={post.categoryId}
                onChange={(e) => setPost({ ...post, categoryId: parseInt(e.target.value) })}
                required
            >
                <option value="" disabled>
                    Select a category
                </option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <input
                type="url"
                value={post.headerImageUrl || ""}
                onChange={(e) => setPost({ ...post, headerImageUrl: e.target.value })}
            />
            <input
                type="date"
                value={post.publishDateTime || ""}
                onChange={(e) => setPost({ ...post, publishDateTime: e.target.value })}
            />
            <button type="submit">Save</button>
        </form>
    );
}
