import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import colors from "../constants/colors";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonLink from "../components/buttons/ButtonLink";
import ButtonSecondary from "../components/buttons/ButtonSecondary";

const Login = ({ navigation }) => {
  const onPressConnect = () => {
    navigation.navigate("Home");
    console.log("Press");
  };
  const onPressCreateAccount = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Connectez-vous</Text>
      <TextInput placeholder="Adresse mail" />
      <TextInput placeholder="Mot de passe" />
      <View style={styles.buttonContainer}>
        <ButtonPrimary
          btnTitle="Se connecter"
          onPress={() => {
            console.log("Navigation vers Home");
            navigation.navigate("Home");
          }}
        />
        <ButtonSecondary
          btnTitle="Créer son compte"
          //onPress={onPressCreateAccount}
        />
        <ButtonLink
          btnTitle="Se connecter en invité"
          //onPress={onPressConnect}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.sky,
    alignItems: "center",
    padding: 8,
  },
  text: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 28,
    color: colors.obsidian,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 8,
  },
});
