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

  async updateUserProfile(updatedData) {
    try {
      const token = await authService.getToken();

      // On filtre les champs vides (sauf username et email qui sont requis)
      const dataToSend = {};
      if (updatedData.username) dataToSend.username = updatedData.username;
      if (updatedData.email) dataToSend.email = updatedData.email;
      if (updatedData.password) dataToSend.password = updatedData.password;

      const response = await fetch(endpoints.USER.UPDATE_PROFILE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(
          result.error || "Erreur lors de la mise à jour du profil"
        );
      }

      return result;
    } catch (error) {
      console.error("updateProfile error: ", error);
      throw error;
    }
  },

  async createUser(newUserData) {
    try {
      const dataToSend = {};
      if (newUserData.username) dataToSend.username = newUserData.username;
      if (newUserData.email) dataToSend.email = newUserData.email;
      if (newUserData.password) dataToSend.password = newUserData.password;

      const response = await fetch(endpoints.USER.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || "Erreur lors de la création du profil");
      }

      return result;
    } catch (error) {
      console.error("createProfile error: ", error);
      throw error;
    }
  },
};

export default userService;
