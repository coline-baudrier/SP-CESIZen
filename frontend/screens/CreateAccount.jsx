import { StyleSheet, Text, View, TextInput, Image, Alert } from "react-native";
import React, { useState, useContext } from "react";
import colors from "../constants/colors";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import userService from "../api/services/userService";
import BigTitle from "../components/texts/BigTitle";
import { AuthContext } from "../context/AuthContext";

const CreateAccount = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userInfo, role } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const isAdminCreation = role === "admin" || route.params?.isAdminCreation;

  const handleCreateAccount = async () => {
    // Validation simple
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);
      let result;

      if (isAdminCreation) {
        // Création d'un admin
        result = await userService.createAdmin({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Création d'un compte normal
        result = await userService.createUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        });
      }

      if (result.error) {
        Alert.alert("Erreur", result.error);
      } else {
        Alert.alert(
          "Succès !",
          isAdminCreation
            ? "Le compte administrateur a bien été créé."
            : "Le compte a bien été créé."
        );
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo-cesizen.png")}
      />
      <View style={styles.inputContainer}>
        <BigTitle
          title={isAdminCreation ? "Créer un administrateur" : "Inscrivez-vous"}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          autoComplete="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse mail"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmer votre mot de passe"
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonPrimary
          btnTitle={
            loading
              ? isAdminCreation
                ? "Création de l'admin..."
                : "Création en cours..."
              : isAdminCreation
              ? "Créer l'administrateur"
              : "Créer mon compte"
          }
          onPress={handleCreateAccount}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  text: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 28,
    color: colors.obsidian,
    marginBottom: 15,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 8,
  },
  inputContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 8,
  },
  input: {
    borderBottomColor: colors.lagoon,
    borderBottomWidth: 2,
    marginBottom: 15,
    width: "85%",
    alignSelf: "center",
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
});
