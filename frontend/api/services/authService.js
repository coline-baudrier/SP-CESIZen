import endpoints from "../apiEndpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authService = {
  /**
   * Connexion de l'utilisateur
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Réponse du serveur
   */
  async login(email, password) {
    try {
      const response = await fetch(endpoints.USER.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Échec de la connexion");
      }

      const data = await response.json();
      await this.storeToken(data.token); // Stockage du token
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Stocke le token JWT
   * @param {string} token
   */
  async storeToken(token) {
    try {
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.error("Error storing token:", error);
      throw error;
    }
  },

  /**
   * Récupère le token stocké
   * @returns {Promise<string|null>}
   */
  async getToken() {
    try {
      return await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  /**
   * Décode le token JWT
   * @param {string} token
   * @returns {Object|null} Données décodées
   */
  decodeToken(token) {
    try {
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  },

  /**
   * Déconnexion
   */
  async logout() {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  /**
   * Vérifie si l'utilisateur est authentifié et son rôle
   * @returns {Promise<{isLoggedIn: boolean, role: string|null}>}
   */
  async checkAuth() {
    try {
      const token = await this.getToken();
      if (!token) return { isLoggedIn: false, role: null };

      const decoded = this.decodeToken(token);
      if (!decoded || decoded.exp < Date.now() / 1000) {
        await this.logout();
        return { isLoggedIn: false, role: null };
      }

      return {
        isLoggedIn: true,
        role: decoded.role || "citizen", // Par défaut citoyen si rôle non spécifié
      };
    } catch (error) {
      console.error("Auth check error:", error);
      return { isLoggedIn: false, role: null };
    }
  },
};

export default authService;
