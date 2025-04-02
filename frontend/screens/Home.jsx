import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import ButtonCard from "../components/buttons/ButtonCard";
import Divider from "../components/utils/Divider";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import CardFeelings from "../components/cards/CardFeelings";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Bienvenue, Lord_Zara</Text>
      </View>

      <View style={styles.cardsContainer}>
        <ButtonCard
          title="Humeur"
          image={require("../assets/backgrounds/humeur.jpg")}
          onPress={() => {
            console.log("Appui sur Humeur");
          }}
        />
        <ButtonCard
          title="Respiration"
          image={require("../assets/backgrounds/humeur.jpg")}
          onPress={() => {
            console.log("Appui sur Respiration");
          }}
        />
      </View>
      <View style={styles.cardsContainer}>
        <ButtonCard
          title="Activité"
          image={require("../assets/backgrounds/humeur.jpg")}
          onPress={() => {
            console.log("Appui sur Activité");
          }}
        />
        <ButtonCard
          title="Stress"
          image={require("../assets/backgrounds/humeur.jpg")}
          onPress={() => {
            console.log("Appui sur Stress");
          }}
        />
      </View>
      <Divider
        color={colors.secondaryDark}
        thickness={2}
        marginVertical={1}
      ></Divider>
      <ButtonPrimary
        btnTitle="Enregistrer mon humeur du jour"
        onPress={() => {
          console.log("Navigation Enregistrer une nouvelle émotion");
        }}
      ></ButtonPrimary>
      <CardFeelings titleCard="Titre" dateCard="Hier"></CardFeelings>
      <Divider
        color={colors.secondaryDark}
        thickness={2}
        marginVertical={1}
      ></Divider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
});

export default Home;
