import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import colors from "../constants/colors";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Screens
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import Home from "../screens/Home";
import ListActivities from "../screens/ListActivities";
import BreathingExercises from "../screens/BreathingExercises";
import Profile from "../screens/ProfileUser";
import EmotionTracker from "../screens/EmotionTracker";
import CreateEmotionTracker from "../screens/CreateNewEmotion";
import ModeratorView from "../screens/ModeratorView";
import UserManagement from "../screens/UserManagement";
import ActivityManagement from "../screens/ActivityManagement";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, role, isLoading, userInfo } = useContext(AuthContext);

  // Loading screen
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

  // Header menu button
  const handleMenuPress = (navigation) => {
    navigation.navigate("Settings");
  };

  // Header options
  const commonHeaderOptions = ({ navigation }) => ({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() =>
            role === "guest"
              ? navigation.navigate("CreateAccount")
              : navigation.navigate("Profile")
          }
          style={{ marginRight: 15 }}
        >
          <Icon name="account-circle" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleMenuPress(navigation)}>
          <Icon name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    ),
    headerLeft: () => (
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() =>
            isLoggedIn
              ? navigation.navigate("Home")
              : navigation.navigate("CreateAccount")
          }
        >
          <Icon name="home" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    ),
  });

  // Déterminez l'écran initial en fonction du rôle
  const getInitialRoute = () => {
    if (role === "admin") {
      return "ModeratorView"; // Admin accède uniquement à l'écran "ModeratorView"
    } else if (isLoggedIn) {
      return "Home"; // Autres utilisateurs connectés accèdent à "Home"
    }
    return "Login"; // Si non connecté, écran Login
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()} // Définir l'écran initial en fonction du rôle
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleAlign: "center",
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            title: "Création de compte",
            headerBackTitle: "Retour",
          }}
        />
        {/* Auth Screens (non connectés) */}
        {!isLoggedIn && (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </>
        )}

        {/* App Screens (connectés) */}
        {isLoggedIn && (
          <>
            {/* Écran ModeratorView pour les admins */}
            {role === "admin" && (
              <>
                <Stack.Screen
                  name="ModeratorView"
                  component={ModeratorView}
                  options={({ navigation }) => ({
                    ...commonHeaderOptions({ navigation }),
                    title: "Panneau d'administration",
                  })}
                />

                <Stack.Screen
                  name="UserManagement"
                  component={UserManagement}
                  options={{
                    title: "Gestion des utilisateurs",
                    headerBackTitle: "Retour",
                  }}
                />
                <Stack.Screen
                  name="CreateAccount"
                  component={CreateAccount}
                  options={{
                    title: "Création compte Administrateur",
                    headerBackTitle: "Retour",
                  }}
                />
                <Stack.Screen
                  name="ActivityManagement"
                  component={ActivityManagement}
                  options={{
                    title: "Gestion des activités",
                    headerBackTitle: "Retour",
                  }}
                />
              </>
            )}

            {/* Écran Home pour les non-admins */}
            {role !== "admin" && (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={({ navigation }) => ({
                    ...commonHeaderOptions({ navigation }),
                    title: userInfo?.profile.username
                      ? `Bonjour ${userInfo.profile.username}`
                      : "Accueil",
                  })}
                />

                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    title: "Mon Profil",
                    headerBackTitle: "Retour",
                  }}
                />

                {/* Accessible uniquement aux invités connectés */}
                {role === "guest" && (
                  <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccount}
                    options={{
                      title: "Créer un compte",
                      headerBackTitle: "Retour",
                    }}
                  />
                )}

                <Stack.Screen
                  name="ListActivities"
                  component={ListActivities}
                  options={({ navigation }) => ({
                    ...commonHeaderOptions({ navigation }),
                    title: "Activités de relaxation",
                  })}
                />

                <Stack.Screen
                  name="EmotionTracker"
                  component={EmotionTracker}
                  options={{
                    title: "Mes Emotions",
                    headerBackTitle: "Retour",
                  }}
                />

                <Stack.Screen
                  name="CreateEmotion"
                  component={CreateEmotionTracker}
                  options={{
                    title: "Enregistrer Emotion",
                    headerBackTitle: "Retour",
                  }}
                />
                <Stack.Screen
                  name="BreathingExercises"
                  component={BreathingExercises}
                  options={({ navigation }) => ({
                    ...commonHeaderOptions({ navigation }),
                    title: "Gestion des exercices",
                  })}
                />
              </>
            )}

            {/* Permettre aux admins d'accéder à l'écran Profil */}
            {role === "admin" && (
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "Mon Profil",
                  headerBackTitle: "Retour",
                }}
              />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
