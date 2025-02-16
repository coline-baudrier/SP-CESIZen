<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-img :src="logo" alt="CESIZen Logo" max-height="512" class="mb-n16"></v-img>

    <v-card class="pa-6 text-center bg-background rounded-xl mt-n16" elevation="6" max-width="400">
      <v-card-title class="font-weight-bold"><h1>CESIZen</h1></v-card-title>
      <v-card-subtitle><h4 class="slogan">Prends soin de ta santé mentale</h4></v-card-subtitle>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12">
          <v-btn color="primary" rounded block :to="'/login'">
            <v-icon left class="pr-4">mdi-login</v-icon> Me connecter
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn color="secondary" rounded block :to="'/register'">
            <v-icon left class="pr-4">mdi-account-plus</v-icon> M'inscrire
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-btn variant="text" class="text-decoration-underline" :to="'/dashboard'">
        Accéder en mode invité
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png';
</script>

<style scoped>
.slogan {
  font-style: italic;
}
</style>
