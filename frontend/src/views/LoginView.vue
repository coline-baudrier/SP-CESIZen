<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="text-center bg-background" flat max-width="400">
      <v-card-title class="font-weight-bold"><h1>Connexion</h1></v-card-title>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Mot de passe"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          required
        ></v-text-field>
        <v-btn color="primary" rounded class="mb-2" type="submit">
          <v-icon left class="mr-2">mdi-login</v-icon> Se connecter
        </v-btn>
        <v-divider class="my-4"></v-divider>
        <v-btn variant="text" class="text-decoration-underline mt-2" :to="'/forgot-password'">
          Mot de passe oublié ?
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const login = async () => {
  console.log('Tentative de connexion avec :', email.value, password.value);
  const success = await userStore.login(email.value, password.value);

  if (success) {
    console.log('Connexion réussie, récupération du profil...');
    await userStore.fetchUser();
    console.log('Utilisateur connecté :', userStore.user);
    router.push('/dashboard');
  } else {
    alert('Échec de la connexion. Vérifiez vos identifiants.');
  }
};
</script>
