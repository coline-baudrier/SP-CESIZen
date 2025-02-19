<template>
  <v-row>
    <v-col>
      <v-card class="ma-4" title="CESIZen" subtitle="Prends soin de ta santé mentale">
        <v-form>
          <v-card-text>
            <!-- Nom d'utilisateur affiché uniquement en mode inscription -->
            <v-expand-transition>
              <v-text-field
                v-if="isSignUp"
                v-model="username"
                label="Nom d'utilisateur"
                outlined
              ></v-text-field>
            </v-expand-transition>

            <!-- Champ Email (toujours affiché) -->
            <v-text-field v-model="email" label="Adresse email" outlined></v-text-field>

            <!-- Mot de passe affiché sauf en mode 'Mot de passe oublié' -->
            <v-expand-transition>
              <v-text-field
                v-model="password"
                label="Mot de passe"
                type="password"
                outlined
              ></v-text-field>
            </v-expand-transition>

            <!-- Confirmation du mot de passe affichée en inscription ou récupération -->
            <v-expand-transition>
              <v-text-field
                v-if="isSignUp || isForgotPassword"
                v-model="confirmPassword"
                label="Confirmez votre mot de passe"
                type="password"
                outlined
              ></v-text-field>
            </v-expand-transition>

            <!-- Bouton Mot de passe oublié affiché uniquement en mode connexion -->
            <v-btn v-if="!isSignUp && !isForgotPassword" @click="toggleForgotPassword">
              Mot de passe oublié ?
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-row justify="center">
              <v-col cols="12" class="text-center">
                <!-- Gestion dynamique des boutons d'action -->
                <v-btn v-if="!isSignUp && !isForgotPassword" @click="login">Me connecter</v-btn>
                <v-btn v-if="isSignUp" @click="register">M'inscrire</v-btn>
                <v-btn v-if="isForgotPassword" @click="resetPassword"
                  >Réinitialiser mon mot de passe</v-btn
                >
              </v-col>

              <v-divider></v-divider>

              <!-- Bouton d'inscription qui alterne avec "Retour" -->
              <v-col cols="12" class="text-center">
                <v-btn v-if="!isForgotPassword" @click="toggleSignUp">
                  {{ isSignUp ? 'Retour' : "M'inscrire" }}
                </v-btn>
                <v-btn v-if="isForgotPassword" @click="resetForm">Annuler</v-btn>
              </v-col>

              <v-divider v-if="!isSignUp && !isForgotPassword"></v-divider>

              <v-col cols="12" class="text-center">
                <v-btn v-if="!isSignUp && !isForgotPassword">Accéder en tant qu'invité</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../../api/interfaces/User.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { userService } from '../../api/services/userService';

// Définition des états du formulaire
const isSignUp = ref(false);
const isForgotPassword = ref(false);

// Définition de l'utilisateur pour les actions
const userStore = useUserStore();

// Champs du formulaire
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Fonction pour basculer entre connexion et inscription
const toggleSignUp = (): void => {
  isSignUp.value = !isSignUp.value;
  isForgotPassword.value = false; // Assure que l'on ne mélange pas les modes
  resetFields();
};

// Fonction pour afficher la récupération de mot de passe
const toggleForgotPassword = (): void => {
  isForgotPassword.value = !isForgotPassword.value;
  isSignUp.value = false; // Assure qu'on ne mélange pas les modes
  resetFields();
};

// Réinitialisation du formulaire lors du retour à l'état normal
const resetForm = (): void => {
  isSignUp.value = false;
  isForgotPassword.value = false;
  resetFields();
};

// Réinitialise les champs de formulaire
const resetFields = (): void => {
  username.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
};

// Async transforme une fonction en une promesse donc Promis<void> parce que je ne retourne rien
const login = async (): Promise<void> => {
  console.log('Tentative de connexion avec', email.value, password.value);
  const success = await userStore.login(email.value, password.value);

  if (success) {
    console.log('Connexion réussi, récupération du profil...');
    await userStore.fetchUser();
    console.log('Utilisateur connecté : ', userStore.user);
    // router.push('/dashboard);
  } else {
    alert('Echec de la connexion, vérifiez vos identifiants.');
  }
};

// Simulation des actions
const register = async (): Promise<void> => {
  console.log(
    'Inscription avec',
    username.value,
    email.value,
    password.value,
    confirmPassword.value
  );

  // Vérification des mots de passe
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas.');
    return;
  }

  try {
    const newUser = await userService.register(username.value, email.value, password.value);
    console.log('Inscription réussie !', newUser);
    alert('Votre compte a été créé avec succès !');
    // router.push('/dashboard');
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    alert("Erreur lors de l'inscription. Vérifiez vos informations et réessayez.");
  }
};

const resetPassword = async (): Promise<void> => {
  console.log(
    'Réinitialisation du mot de passe pour',
    email.value,
    password.value,
    confirmPassword.value
  );

  // Vérification des mots de passe
  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas.');
    return;
  }

  try {
    const response = await userService.changePassword(email.value, password.value);
    console.log("Réponse de l'API : ", response);
    alert('Votre mot de passe a été changé avec succès !');
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe :', error);
    alert('Erreur lors  du changement de mot de passe. Vérifiez vos informations et réessayez.');
  }
};
</script>
