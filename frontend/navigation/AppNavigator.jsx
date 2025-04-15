import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import colors from "../constants/colors";
import { View, ActivityIndicator } from "react-native";

// Screens
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import Home from "../screens/Home";
import ListActivities from "../screens/ListActivities";
import BreathingExercises from "../screens/BreathingExercises";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, role, isLoading, userInfo } = useContext(AuthContext);

  // Écran de chargement personnalisé
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleAlign: "center",
          animation: "fade", // Animation plus douce entre les écrans
        }}
      >
        {!isLoggedIn ? (
          // Stack pour utilisateurs non connectés
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Connexion",
                headerShown: false, // Cache l'en-tête pour l'écran de connexion
              }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: "Créer un compte",
                headerBackTitle: "Retour", // Texte personnalisé pour le bouton retour
              }}
            />
          </Stack.Group>
        ) : (
          // Stack pour utilisateurs connectés
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                title: userInfo?.username
                  ? `Bonjour ${userInfo.username}`
                  : "Accueil",
                headerLeft: () => null, // Désactive le bouton retour sur l'écran d'accueil
              })}
            />
            <Stack.Screen
              name="ListActivities"
              component={ListActivities}
              options={{
                title: "Activités de relaxation",
                headerBackTitle: "Retour",
              }}
            />

            {role === "admin" && (
              <Stack.Screen
                name="BreathingExercises"
                component={BreathingExercises}
                options={{
                  title: "Gestion des exercices",
                  headerBackTitle: "Retour",
                }}
              />
            )}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
