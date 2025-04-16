import endpoints from "../apiEndpoints";
import authService from "./authService";

const emotionTrackerService = {
  async getJournal() {
    try {
      const token = await authService.getToken();
      if (!token) throw new Error("Authentication required");

      const response = await fetch(endpoints.EMOTION_TRACKER.GET_JOURNAL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch emotion journal");
      }

      return data;
    } catch (error) {
      console.error("API Error - getJournal:", error);
      throw new Error(error.message || "Network request failed");
    }
  },

  async getJournalByPeriod(period) {
    try {
      // Validation de la période
      const validPeriods = ["day", "week", "month", "year"];
      if (!validPeriods.includes(period)) {
        throw new Error("Invalid period specified");
      }

      const token = await authService.getToken();
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        endpoints.EMOTION_TRACKER.GET_JOURNAL_PERIOD,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ period }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch period journal");
      }

      return data;
    } catch (error) {
      console.error("API Error - getJournalByPeriod:", error);
      throw new Error(error.message || "Network request failed");
    }
  },
};

export default emotionTrackerService;
