import { StyleSheet, View, TextInput, Image } from "react-native";
import React, { useState, useContext } from "react";
import colors from "../constants/colors";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonLink from "../components/buttons/ButtonLink";
import ButtonSecondary from "../components/buttons/ButtonSecondary";
import BigTitle from "../components/texts/BigTitle";
import { AuthContext } from "../context/AuthContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loginGuest } = useContext(AuthContext);

  const handleLogin = async () => {
    setError("");
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo-cesizen.png")}
      />
      <View style={styles.inputContainer}>
        <BigTitle title="Connectez-vous"></BigTitle>
        <TextInput
          style={styles.input}
          placeholder="Adresse mail"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <View style={styles.buttonContainer}>
        <ButtonPrimary btnTitle="Se connecter" onPress={handleLogin} />
        <ButtonSecondary
          btnTitle="Créer son compte"
          onPress={() => {
            console.log("Navigation vers Création de compte");
            navigation.navigate("CreateAccount");
          }}
        />
        <ButtonSecondary
          btnTitle="Se connecter en invité"
          onPress={loginGuest}
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
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-evenly",
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
