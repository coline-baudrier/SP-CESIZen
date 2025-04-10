import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import ButtonCard from "../components/buttons/ButtonCard";
import Divider from "../components/utils/Divider";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonSecondary from "../components/buttons/ButtonSecondary";
import CardFeelings from "../components/cards/CardFeelings";
import CardActivity from "../components/cards/CardActivity";
import CardResultStress from "../components/cards/CardResultStress";
import BigTitle from "../components/texts/BigTitle";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BigTitle title="Bienvenue, Lord_Zara"></BigTitle>
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
              navigation.navigate("Breathing Exercises");
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
        <BigTitle title="Mes émotions"></BigTitle>
        <CardFeelings
          titleCard="Titre"
          dateCard="Hier"
          noteCard=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim ex libero, non pretium lorem sollicitudin vitae. Fusce et convallis ipsum. Duis in justo dictum, porta mi at, sagittis ante. Proin dapibus dapibus ultricies. Duis vitae mauris sed lectus volutpat ornare sed non sapien. Sed a libero magna."
        ></CardFeelings>
        <CardFeelings
          titleCard="Titre"
          dateCard="Hier"
          noteCard=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim ex libero, non pretium lorem sollicitudin vitae. Fusce et convallis ipsum. Duis in justo dictum, porta mi at, sagittis ante. Proin dapibus dapibus ultricies. Duis vitae mauris sed lectus volutpat ornare sed non sapien. Sed a libero magna."
        ></CardFeelings>
        <CardFeelings
          titleCard="Titre"
          dateCard="Hier"
          noteCard=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim ex libero, non pretium lorem sollicitudin vitae. Fusce et convallis ipsum. Duis in justo dictum, porta mi at, sagittis ante. Proin dapibus dapibus ultricies. Duis vitae mauris sed lectus volutpat ornare sed non sapien. Sed a libero magna."
        ></CardFeelings>
        <ButtonPrimary
          btnTitle="Enregistrer mon humeur du jour"
          onPress={() => {
            console.log("Navigation Enregistrer une nouvelle émotion");
          }}
        ></ButtonPrimary>
        <Divider
          color={colors.secondaryDark}
          thickness={2}
          marginVertical={10}
        ></Divider>
        <View>
          <BigTitle title="Activités de relaxation"></BigTitle>
          enregistrées
          <CardActivity
            title="Allez dehors"
            description="blablabla"
            image={require("../assets/backgrounds/humeur.jpg")}
          ></CardActivity>
          <View>
            <ButtonSecondary
              btnTitle="Voir toutes les activités"
              onPress={() => {
                console.log("Navigation Voir la liste de toutes les activités");
              }}
            ></ButtonSecondary>
            fitre déjà appliqué sur les favoris = 1
            <ButtonSecondary
              btnTitle="Voir mes activités favorites"
              onPress={() => {
                console.log("Navigation Voir ma liste d'activités favorites");
              }}
            ></ButtonSecondary>
          </View>
        </View>
        <Divider
          color={colors.secondaryDark}
          thickness={2}
          marginVertical={10}
        ></Divider>
        <BigTitle title="Exercices de respiration"></BigTitle>
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
        <View style={styles.cardsContainer}>
          <ButtonCard
            title="Activité"
            image={require("../assets/backgrounds/humeur.jpg")}
            onPress={() => {
              console.log("Appui sur Activité");
            }}
          />
        </View>
        <ButtonSecondary
          btnTitle="Ajouter un exercice personnalisé"
          onPress={() => {
            console.log("Navigation Voir ma liste d'activités favorites");
          }}
        ></ButtonSecondary>
        <Divider
          color={colors.secondaryDark}
          thickness={2}
          marginVertical={1}
        ></Divider>
        <View>
          <BigTitle title="Diagnostics de stress"></BigTitle>
          <CardResultStress
            score="75%"
            testName="Test de stress professionnel"
            date="2024-03-15"
            description="Votre score indique un niveau de stress modéré. Nous recommandons des exercices de respiration quotidienne et une revue de la charge de travail."
          />
          <ButtonPrimary
            btnTitle="Lancer un diagnostic de stress"
            onPress={() => {
              console.log("Navigation Lancer un diagnostic de stress (choix)");
            }}
          ></ButtonPrimary>
        </View>
      </ScrollView>
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
  title: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 28,
    color: colors.obsidian,
    marginBottom: 15,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default Home;
