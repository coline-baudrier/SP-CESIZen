import apiEndpoints from "../apiEndpoints";

const emotionTrackerService = {
  /**
   * Récupère toutes les entrées du journal
   * @param {string} token - Token d'authentification
   * @returns {Promise<Array>} Liste des entrées
   */
  // emotionTrackerService.js - Modifiez la fonction getJournalEntries comme suit :
  async getJournalEntries(token) {
    try {
      const response = await fetch(apiEndpoints.EMOTION_TRACKER.GET_JOURNAL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération du journal"
        );
      }

      const data = await response.json();
      // Transformez les données pour correspondre à votre interface
      return data.map((entry) => ({
        id: entry.id,
        emotion_name: entry.emotion_name,
        intensity: entry.intensity,
        note: entry.note,
        date: entry.created_at, // Utilisez created_at comme date
        description: entry.note, // Utilisez note comme description
      }));
    } catch (error) {
      console.error("getJournalEntries error:", error);
      throw error;
    }
  },

  /**
   * Récupère les entrées du journal par période
   * @param {string} token - Token d'authentification
   * @param {string} period - Période ('week', 'month', 'year')
   * @returns {Promise<Array>} Liste des entrées filtrées
   */
  async getJournalEntriesByPeriod(token, period) {
    try {
      const response = await fetch(
        apiEndpoints.EMOTION_TRACKER.GET_JOURNAL_BY_PERIOD,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ period }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message ||
            "Erreur lors de la récupération des entrées par période"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("getJournalEntriesByPeriod error:", error);
      throw error;
    }
  },

  /**
   * Récupère une entrée spécifique par son ID
   * @param {string} token - Token d'authentification
   * @param {string} id - ID de l'entrée
   * @returns {Promise<Object>} Détails de l'entrée
   */
  async getEntryById(token, id) {
    try {
      const response = await fetch(apiEndpoints.EMOTION_TRACKER.GET_ENTRY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Erreur lors de la récupération de l'entrée"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("getEntryById error:", error);
      throw error;
    }
  },

  /**
   * Ajoute une nouvelle entrée dans le journal émotionnel
   * @param {string} token - Token d'authentification
   * @param {Object} entryData - Données de l'entrée ({ emotion_id, intensity, note? })
   * @returns {Promise<Object>} Résultat de l'opération
   */
  async addEntry(token, entryData) {
    try {
      const response = await fetch(apiEndpoints.EMOTION_TRACKER.CREATE_ENTRY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entryData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de l'ajout de l'entrée");
      }

      return await response.json();
    } catch (error) {
      console.error("addEntry error:", error);
      throw error;
    }
  },
};

export default emotionTrackerService;
