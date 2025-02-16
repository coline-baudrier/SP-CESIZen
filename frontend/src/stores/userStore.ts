import { defineStore } from 'pinia';
import { userService } from '../../api/services/userService.ts';
import type { User, UserResponse } from '../../api/interfaces/User.ts';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const { token } = await userService.authenticate(email, password);
        this.token = token;
        localStorage.setItem('token', token);

        await this.fetchUser();
        return true;
      } catch (error) {
        console.error('Erreur de connexion : ', error);
        return false;
      }
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    async fetchUser() {
      if (!this.token) {
        console.warn('Aucun token trouvé !');
        return;
      }

      try {
        console.log('Envoi du token JWT pour récupération du profil :', this.token);
        const response = (await userService.getProfile()) as UserResponse; // ⬅ Ajoute ce type
        console.log('Profil utilisateur reçu :', response);

        if (response.profile) {
          this.user = response.profile;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          console.error('Format de réponse inattendu :', response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil : ', error);
        if (error instanceof Error && 'response' in error) {
          const axiosError = error as { response?: { status: number } };
          if (axiosError.response?.status === 401) {
            this.logout();
          }
        }
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 2, // Vérifie si l'utilisateur est admin
  },
});
