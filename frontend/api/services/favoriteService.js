import endpoints from "../apiEndpoints";
import authService from "./authService";

const favoriteService = {
  /**
   * Ajoute une activité aux favoris
   * @param {number} activityId - ID de l'activité à ajouter
   * @returns {Promise<Object>} Réponse du serveur
   */
  async addFavorite(activityId) {
    try {
      const token = await authService.getToken();
      if (!token) throw new Error("Utilisateur non authentifié");

      const response = await fetch(endpoints.ACTIVITIES_FAVORITE.ADD_IN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ activity_id: activityId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de l'ajout aux favoris");
      }

      return await response.json();
    } catch (error) {
      console.error("addFavorite error:", error);
      throw error;
    }
  },

  /**
   * Récupère la liste des activités favorites
   * @returns {Promise<Array>} Liste des activités favorites
   */
  async getFavorites() {
    try {
      const token = await authService.getToken();
      if (!token) throw new Error("Utilisateur non authentifié");

      const response = await fetch(
        endpoints.ACTIVITIES_FAVORITE.GET_FAVORITES,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Erreur lors de la récupération des favoris"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("getFavorites error:", error);
      throw error;
    }
  },

  /**
   * Supprime une activité des favoris
   * @param {number} activityId - ID de l'activité à supprimer
   * @returns {Promise<Object>} Réponse du serveur
   */
  async removeFavorite(activityId) {
    try {
      const token = await authService.getToken();
      if (!token) throw new Error("Utilisateur non authentifié");

      const response = await fetch(
        endpoints.ACTIVITIES_FAVORITE.REMOVE_FAVORITE,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ activity_id: activityId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Erreur lors de la suppression des favoris"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("removeFavorite error:", error);
      throw error;
    }
  },

  /**
   * Vérifie si une activité est dans les favoris de l'utilisateur
   * @param {number} activityId - ID de l'activité à vérifier
   * @returns {Promise<boolean>} True si l'activité est favorite pour cet utilisateur
   */
  async isFavorite(activityId) {
    try {
      const favorites = await this.getFavorites();
      return favorites.some((fav) => fav.id === activityId);
    } catch (error) {
      console.error("isFavorite error:", error);
      return false;
    }
  },
};

export default favoriteService;
