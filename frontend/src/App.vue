<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>

<style scoped>
/* Plus de styles globaux ici, tout est dans `base.css` et `main.css` */
</style>
