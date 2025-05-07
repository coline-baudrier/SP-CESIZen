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
    headerLeft: () => null,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerTitleAlign: "center",
          animation: "fade",
        }}
      >
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

            {role === "admin" && (
              <Stack.Screen
                name="BreathingExercises"
                component={BreathingExercises}
                options={({ navigation }) => ({
                  ...commonHeaderOptions({ navigation }),
                  title: "Gestion des exercices",
                })}
              />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
