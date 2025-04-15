import endpoints from "../apiEndpoints";

const relaxationActivityService = {
  /**
   * Récupère toutes les activités de relaxation
   * @returns {Promise<Array>} Liste des activités
   */
  async getRelaxationActivities() {
    try {
      const response = await fetch(endpoints.ACTIVITIES.GET_ALL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération des exercices"
        );
      }
      return await response.json();
    } catch (error) {
      console.error("getRelaxationActivities error:", error);
      throw error;
    }
  },

  /**
   * Récupère une activité de relaxation spécifique par son ID
   * @param {string|number} id - L'identifiant de l'activité
   * @returns {Promise<Object>} - L'activitié demandée
   */
  async getOne(id) {
    try {
      const response = await fetch(endpoints.ACTIVITIES.GET_ONE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération de l'activité"
        );
      }
      return await response.json();
    } catch (error) {
      console.error("getOne relaxation activity error:", error);
      throw error;
    }
  },
};

export default relaxationActivityService;
