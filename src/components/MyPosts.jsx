import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPostsByUserId } from "../managers/PostManager";

export default function MyPosts({ loggedInUser }) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    // console.log("what is loggedInUser for MyPosts", loggedInUser);

    useEffect(() => {
        if (loggedInUser) {
            getPostsByUserId(loggedInUser.id)
                .then(setPosts)
                .catch((err) => console.error("Failed to fetch posts:", err));
        }
    }, [loggedInUser]);


    return (
        <div>
            <h2>My Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            {post.title} - {post.category}
                        </Link>
                        <button onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit</button>
                        <button onClick={() => navigate(`/posts/delete/${post.id}`)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}