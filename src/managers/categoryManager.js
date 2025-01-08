const _apiUrl = '/api/category';

export const getAllCategories = () => {
  return fetch(_apiUrl).then((res) => res.json());
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
