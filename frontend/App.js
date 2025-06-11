// src/App.js
import React from "react";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { fontsToLoad } from "./constants/fonts"; // Exportez vos polices dans un fichier séparé

// Garder le splash screen affiché tant qu'on charge les ressources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fontsToLoad);

  if (!fontsLoaded) {
    return null; // Ou un écran de chargement personnalisé
  }

  // Cache le splash screen une fois tout chargé
  SplashScreen.hideAsync();

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
