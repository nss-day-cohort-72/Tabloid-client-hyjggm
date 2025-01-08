const _apiUrl = "/api/post";


export const getAllPosts = () => {
    return fetch(_apiUrl, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }
        return res.json();
    });
};

export const createPost = (newPost) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create post");
        }
        return res.json();
    });
};

export const getPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch post details");
        }
        return res.json();
    });
};

export const updatePost = (id, updatedPost) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedPost),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to update post");
        }
    });
};


// export const updatePost = (id, updatedPost) => {
//     return fetch(`${_apiUrl}/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPost),
//     }).then((res) => {
//         if (!res.ok) {
//             throw new Error("Failed to update post");
//         }
//     });
// };

// export const deletePost = (id) => {
//     return fetch(`${_apiUrl}/${id}`, {
//         method: "DELETE",
//     }).then((res) => {
//         if (!res.ok) {
//             throw new Error("Failed to delete post");
//         }
//     });
// };

export const deletePost = (id, userId) => {
    return fetch(`${_apiUrl}/${id}?userId=${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to delete post");
        }
    });
};


export const getPostsByUserId = (userId) => {
    return fetch(`${_apiUrl}/myposts?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch user posts");
        }
        return res.json();
    });
};

