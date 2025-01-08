import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../managers/PostManager";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        getAllPosts()
            .then((data) => {
                console.log("Fetched posts:", data); // Log the structure of the posts
                setPosts(data);
            })
            .catch((err) => console.error("Failed to fetch posts:", err));
    }, []);

    return (
        <div>
            <h2>All Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            {post.title} - {post.category || "Uncategorized"}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
