const API_URL = "https://6af348f3d2377d6c3704d1d5.mockapi.io/channels";

const request = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Ressource introuvable (404).");
    }
    if (response.status >= 500) {
      throw new Error(`Erreur du serveur (${response.status}).`);
    }
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return response.json();
};

export const fetchchannel = () => request(API_URL);

export const updateChannel = (id, data) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const setFavorite = (id, value) =>
  updateChannel(id, { isFavorite: value });