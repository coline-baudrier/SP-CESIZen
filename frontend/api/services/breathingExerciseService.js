import endpoints from "../apiEndpoints";

const breathingExerciseService = {
  /**
   * Récupère tous les exercices de respiration
   * @returns {Promise<Array>} Liste des exercices
   */
  async getBreathingExercises() {
    try {
      const response = await fetch(endpoints.BREATHING_EXERCISE.GET_ALL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Ajoutez le token si nécessaire :
          // 'Authorization': `Bearer ${await SecureStore.getItemAsync('authToken')}`
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
      console.error("getBreathingExercises error:", error);
      throw error;
    }
  },
};

export default breathingExerciseService;
