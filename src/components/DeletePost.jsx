import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../managers/PostManager";

export default function DeletePost({ loggedInUser }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        deletePost(id, loggedInUser.id)
            .then(() => {
                alert("Post deleted successfully");
                navigate("/myposts");
            })
            .catch((err) => alert("Failed to delete post: " + err.message));
    };

    const handleCancel = () => {
        navigate("/myposts");
    };

    return (
        <div>
            <h2>Are you sure you want to delete this post?</h2>
            <button onClick={handleDelete}>Yes, Delete</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}
