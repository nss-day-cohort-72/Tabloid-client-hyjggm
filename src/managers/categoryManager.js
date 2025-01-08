const _apiUrl = "/api/category";

export const getCategories = () => {
    return fetch(_apiUrl).then((res) => res.json());
};

export const createCategory = (newCategory) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
    }).then((res) => {
        if (!res.ok) throw new Error("Failed to create category");
        return res.json();
    });
};

export const updateCategory = (id, updatedCategory) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
    }).then((res) => {
        if (!res.ok) throw new Error("Failed to update category");
    });
};

export const deleteCategory = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
    }).then((res) => {
        if (!res.ok) throw new Error("Failed to delete category");
    });
};
