<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="text-center bg-background pa-4" flat max-width="500">
      <v-card-title class="font-weight-bold">
        <h1>Bienvenue sur CESIZen</h1>
      </v-card-title>

      <v-divider class="my-4"></v-divider>

      <v-card-text v-if="user">
        <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
        <p><strong>Email :</strong> {{ user.email }}</p>
        <p><strong>Rôle :</strong> {{ user.role === 2 ? 'Administrateur' : 'Utilisateur' }}</p>
      </v-card-text>

      <v-card-text v-else>
        <p class="text-red">Aucun utilisateur connecté.</p>
        <v-btn color="primary" to="/login">Se connecter</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.user);
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}

p {
  font-size: 1.2rem;
}
</style>
