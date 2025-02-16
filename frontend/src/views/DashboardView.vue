<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center px-4 py-6">
    <v-sheet class="text-center pa-6 w-100">
      <v-card-title class="font-weight-bold text-primary text-h4"> Dashboard </v-card-title>

      <h4 v-if="userStore.isAuthenticated" class="slogan">
        Bienvenue, {{ user?.username }}
        <v-icon v-if="userStore.isAdmin">mdi-shield-crown-outline</v-icon>
        <v-icon v-else>mdi-account-circle-outline</v-icon>
      </h4>
      <h4 v-else class="slogan text-grey-darken-1">Bienvenue, cher Inconnu !</h4>

      <v-divider class="my-4"></v-divider>

      <!-- Boutons d'actions -->
      <v-card-text v-if="userStore.isAuthenticated">
        <div class="d-flex flex-column gap-3">
          <!-- Section 1: Émotions -->
          <v-btn color="primary" block rounded size="large">
            <v-icon left>mdi-emoticon-happy-outline</v-icon>
            Enregistrer une émotion
          </v-btn>

          <v-btn color="primary" block rounded size="large">
            <v-icon left>mdi-book-open-outline</v-icon>
            Voir mon journal d'émotion
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <!-- Section 2: Tests -->
          <v-btn color="secondary" block rounded size="large">
            <v-icon left>mdi-brain</v-icon>
            Faire un test de stress
          </v-btn>

          <v-btn color="secondary" block rounded size="large">
            <v-icon left>mdi-history</v-icon>
            Voir mon historique de tests
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <!-- Section 3: Relaxation -->
          <v-btn color="success" block rounded size="large">
            <v-icon left>mdi-weather-windy</v-icon>
            Faire un exercice de respiration
          </v-btn>

          <v-btn color="accent" block rounded size="large">
            <v-icon left>mdi-yoga</v-icon>
            Voir les activités de relaxation
          </v-btn>

          <v-btn color="pink-lighten-1" block rounded size="large">
            <v-icon left>mdi-heart</v-icon>
            Voir mes activités favorites
          </v-btn>
        </div>
      </v-card-text>

      <v-card-text v-else>
        <p class="text-grey-darken-1">Pour avoir accès à tout, créez-vous un compte.</p>
      </v-card-text>

      <v-divider class="my-4"></v-divider>

      <!-- Bouton Déconnexion -->
      <v-btn
        v-if="userStore.isAuthenticated"
        color="error"
        rounded
        block
        size="large"
        class="mt-2"
        @click="logout"
      >
        <v-icon left>mdi-logout</v-icon> Déconnexion
      </v-btn>

      <!-- Bouton Inscription pour non connectés -->
      <v-btn v-else color="secondary" rounded block size="large" class="mt-2" to="/register">
        <v-icon left>mdi-account-plus</v-icon> M'inscrire
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const user = computed(() => userStore.user);

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<style scoped>
.slogan {
  font-style: italic;
  font-size: 1rem;
}

.gap-3 > * {
  margin-bottom: 12px;
}
</style>
