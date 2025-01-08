import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../managers/PostManager";
import { getCategories } from "../managers/CategoryManager";

export default function CreatePost({ loggedInUser }) {
    // console.log("What is loggedInUser in CreatePost:", loggedInUser);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [headerImageUrl, setHeaderImageUrl] = useState("");
    const [publishDateTime, setPublishDateTime] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

      // Fetch categories on component load
    useEffect(() => {
        getCategories()
            .then(setCategories)
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title,
            content,
            categoryId: parseInt(categoryId),
            headerImageUrl,
            publishDateTime,
            authorId: loggedInUser.id, // Pass the logged-in user's ID
        };

        createPost(newPost)
            .then((post) => navigate(`/posts/${post.id}`))
            .catch((err) => alert(err.message));
    };

    if (categories.length === 0) return <p>Loading categories...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
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
                placeholder="Header Image URL"
                value={headerImageUrl}
                onChange={(e) => setHeaderImageUrl(e.target.value)}
            />
            <input
                type="date"
                value={publishDateTime}
                onChange={(e) => setPublishDateTime(e.target.value)}
            />
            <button type="submit">Save</button>
        </form>
    );
}