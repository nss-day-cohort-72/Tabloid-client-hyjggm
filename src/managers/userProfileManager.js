const _apiUrl = '/api/userprofile';

export const getProfiles = () => {
  return fetch(_apiUrl + '/withroles').then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const deactivateUserProfile = (id) => {
  return fetch(`${_apiUrl}/deactivate/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const activateUserProfile = (id) => {
  return fetch(`${_apiUrl}/activate/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const promoteUser = (id) => {
  return fetch(`${_apiUrl}/promote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const demoteUser = (id) => {
  return fetch(`${_apiUrl}/demote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
