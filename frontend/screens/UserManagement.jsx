import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import userService from "../api/services/userService";
import colors from "../constants/colors";
import BigTitle from "../components/texts/BigTitle";

const UserManagement = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await userService.deleteUser(userId);
              fetchUsers(); // Rafraîchir la liste
              Alert.alert("Succès", "Utilisateur supprimé avec succès");
            } catch (error) {
              Alert.alert("Erreur", error.message);
            }
          },
        },
      ]
    );
  };

  const mapRoleToText = (role) => {
    switch (role) {
      case 1:
        return "Utilisateur";
      case 2:
        return "Admin";
      case 3:
        return "Modérateur";
      default:
        return "Invité";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BigTitle title="Gestion des utilisateurs" />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : users.length === 0 ? (
        <Text style={styles.noUsersText}>Aucun utilisateur trouvé</Text>
      ) : (
        <View style={styles.usersContainer}>
          {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.username}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userRole}>
                  Rôle: {mapRoleToText(user.role)}
                </Text>
              </View>

              {user.id !== userInfo?.profile?.id && (
                <TouchableOpacity
                  onPress={() => handleDelete(user.id)}
                  style={styles.deleteButton}
                >
                  <Icon name="delete" size={24} color={colors.danger} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  usersContainer: {
    marginTop: 20,
  },
  userCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  userEmail: {
    fontSize: 14,
    color: colors.secondary,
    marginVertical: 4,
  },
  userRole: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: 8,
  },
  noUsersText: {
    textAlign: "center",
    color: colors.secondary,
    marginTop: 40,
    fontSize: 16,
  },
});

export default UserManagement;
