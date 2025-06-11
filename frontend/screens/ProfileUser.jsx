import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../constants/colors";
import userService from "../api/services/userService";

const ProfileUser = ({ navigation }) => {
  const { userInfo, logout, updateUserInfo } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userInfo?.profile?.username || "",
    email: userInfo?.profile?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Réinitialiser le formulaire quand on annule
    if (isEditing) {
      setFormData({
        username: userInfo?.profile?.username || "",
        email: userInfo?.profile?.email || "",
        password: "",
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      // Préparer les données à envoyer
      const dataToSend = {
        username: formData.username,
        email: formData.email,
      };

      // Ajouter le mot de passe seulement s'il a été saisi
      if (formData.password) {
        dataToSend.password = formData.password;
      }

      const result = await userService.updateUserProfile(dataToSend);

      // Mettre à jour le contexte avec les nouvelles données
      const updatedUser = await userService.getUserInfo();
      updateUserInfo(updatedUser);

      Alert.alert("Succès", result.message || "Profil mis à jour avec succès");
      setIsEditing(false);
    } catch (error) {
      Alert.alert(
        "Erreur",
        error.message || "Une erreur est survenue lors de la mise à jour"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" size={80} color={colors.primary} />
        </View>
        {isEditing ? (
          <TextInput
            style={[styles.usernameInput, styles.editableInput]}
            value={formData.username}
            onChangeText={(text) =>
              setFormData({ ...formData, username: text })
            }
          />
        ) : (
          <Text style={styles.username}>
            {userInfo?.profile?.username || "Utilisateur"}
          </Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du compte</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nom d'utilisateur</Text>
            {isEditing ? (
              <TextInput
                style={styles.editableInput}
                value={formData.username}
                onChangeText={(text) =>
                  setFormData({ ...formData, username: text })
                }
              />
            ) : (
              <Text style={styles.infoValue}>
                {userInfo?.profile?.username || "-"}
              </Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Mot de passe</Text>
            {isEditing ? (
              <TextInput
                style={styles.editableInput}
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                placeholder="Nouveau mot de passe"
                secureTextEntry
              />
            ) : (
              <View style={styles.passwordContainer}>
                <Text style={styles.infoValue}>••••••••</Text>
              </View>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Adresse email</Text>
            {isEditing ? (
              <TextInput
                style={styles.editableInput}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.infoValue}>
                {userInfo?.profile?.email || "-"}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textOnPrimary} />
                ) : (
                  <>
                    <Icon name="save" size={20} color={colors.textOnPrimary} />
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleEditToggle}
                disabled={loading}
              >
                <Icon name="close" size={20} color={colors.textOnPrimary} />
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={handleEditToggle}
              >
                <Icon name="edit" size={20} color={colors.textOnPrimary} />
                <Text style={styles.buttonText}>Modifier le profil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={logout}
              >
                <Icon name="logout" size={20} color={colors.textOnPrimary} />
                <Text style={styles.buttonText}>Se déconnecter</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    padding: 5,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerLight,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  editableInput: {
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 5,
    padding: 8,
    minWidth: 150,
    textAlign: "right",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonsContainer: {
    gap: 15,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 10,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  logoutButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProfileUser;
