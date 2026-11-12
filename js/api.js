const API_URL = "https://6af348f3d2377d6c3704d1d5.mockapi.io/channels";

export const fetchchannel = async () => {
  const response = await fetch(API_URL);

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
