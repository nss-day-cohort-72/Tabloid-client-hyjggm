const _apiUrl = "/api/userprofile";

export const getActiveProfiles = () => {
  return fetch(`${_apiUrl}/active`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch active user profiles");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching active profiles:", error);
    });
};


export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const deactivateProfile = (id) => {
  console.log(`Attempting to deactivate profile with ID: ${id}`);
  return fetch(`${_apiUrl}/deactivate/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to deactivate user profile with ID: ${id}. Status: ${res.status}`);
      }
      console.log(`Successfully deactivated profile with ID: ${id}`);
    })
    .catch((error) => {
      console.error(`Error deactivating profile with ID: ${id}`, error);
      throw error; // Rethrow to handle in the calling function
    });
};

export const getDeactivatedProfiles = () => {
  return fetch(`${_apiUrl}/deactivated`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  }).then((res) => res.json());
};

export const reactivateProfile = (id) => {
  console.log(`Attempting to reactivate profile with ID: ${id}`);
  return fetch(`${_apiUrl}/reactivate/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to reactivate user profile with ID: ${id}. Status: ${res.status}`);
      }
      console.log(`Successfully reactivated profile with ID: ${id}`);
    })
    .catch((error) => {
      console.error(`Error reactivating profile with ID: ${id}`, error);
      throw error; // Rethrow to handle in the calling function
    });
};