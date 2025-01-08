import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, deletePost } from "../managers/PostManager";

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(id)
            .then(setPost)
            .catch((err) => alert(err.message));
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(id)
                .then(() => navigate("/myposts"))
                .catch((err) => alert(err.message));
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => navigate(`/posts/edit/${id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}
