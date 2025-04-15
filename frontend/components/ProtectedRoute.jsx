import React, { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { isLoggedIn, role, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si aucun rôle spécifié, la route est publique
  if (!roles) return children;

  // Si rôle spécifié mais pas connecté
  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Veuillez vous connecter</Text>
      </View>
    );
  }

  // Si connecté mais pas le bon rôle
  if (!roles.includes(role)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Accès non autorisé</Text>
      </View>
    );
  }

  // Tout est bon
  return children;
};

export default ProtectedRoute;
