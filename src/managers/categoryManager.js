const _apiUrl = '/api/category';

export const getAllCategories = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getCategoryById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((data) => data.json());
};

export const addNewCategory = (newCategoryObj) => {
  return fetch(_apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCategoryObj),
  }).then((res) => res.json());
};

export const editCategory = (id, categoryObj) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryObj),
  });
};
