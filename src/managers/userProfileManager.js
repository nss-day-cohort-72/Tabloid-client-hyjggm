const _apiUrl = '/api/userprofile';

export const getProfiles = () => {
  return fetch(_apiUrl + '/withroles').then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const deactivateUserProfile = (id) => {
  return fetch(`${_apiUrl}/deactivate/${id}`, {
    method: 'PUT', // Specify the HTTP method
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
