import endpoints from "../apiEndpoints";
import authService from "./authService";

const userService = {
  async getUserInfo() {
    try {
      const token = await authService.getToken();

      const response = await fetch(endpoints.USER.GET_PROFILE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await authService.getToken()}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Erreur lors de la récupération des informations"
        );
      }

      const data = await response.json();
      console.log("User info from API:", data); // Vérifiez la structure des données
      return data;

      return await response.json();
    } catch (error) {
      console.error("getProfile error: ", error);
      throw error;
    }
  },
};

export default userService;
