import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React from "react";
import colors from "../constants/colors";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonLink from "../components/buttons/ButtonLink";
import ButtonSecondary from "../components/buttons/ButtonSecondary";

const CreateAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo-cesizen.png")}
      />
      // TODO : Logique de création de compte
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Inscrivez-vous</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          autoComplete="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse mail"
          autoComplete="email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer votre mot de passe"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonPrimary
          btnTitle="Créer mon compte"
          onPress={() => {
            console.log("Navigation vers Home");
            navigation.navigate("Home");
          }}
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
