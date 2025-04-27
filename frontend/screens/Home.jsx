import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  findNodeHandle,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useRef } from "react";
import colors from "../constants/colors";
import ButtonCard from "../components/buttons/ButtonCard";
import Divider from "../components/utils/Divider";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonSecondary from "../components/buttons/ButtonSecondary";
import CardFeelings from "../components/cards/CardFeelings";
import CardActivity from "../components/cards/CardActivity";
import CardResultStress from "../components/cards/CardResultStress";
import BigTitle from "../components/texts/BigTitle";
import BreathingExercises from "./BreathingExercises";

const Home = ({ navigation }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const breathingExercisesRef = useRef(null);

  const scrollToBreathingExercises = () => {
    if (breathingExercisesRef.current && scrollViewRef.current) {
      breathingExercisesRef.current.measure(
        (x, y, width, height, pageX, pageY) => {
          scrollViewRef.current.scrollTo({
            y: Math.max(0, pageY - 175),
            animated: true,
            duration: 1000,
          });
        }
      );
    }
  };

  console.log("UserInfo in Home:", userInfo);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        decelerationRate="normal"
        snapToAlignment="start"
      >
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
            onPress={scrollToBreathingExercises}
          />
        </View>
        <View style={styles.cardsContainer}>
          <ButtonCard
            title="Activités"
            image={require("../assets/backgrounds/humeur.jpg")}
            onPress={() => {
              navigation.navigate("ListActivities");
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

          <CardActivity
            image={require("../assets/backgrounds/humeur.jpg")}
          ></CardActivity>
          <View style={styles.buttonsRow}>
            <View style={styles.buttonWrapper}>
              <ButtonSecondary
                btnTitle="Voir toutes les activités"
                onPress={() => {
                  navigation.navigate("ListActivities");
                }}
              />
            </View>
          </View>
        </View>
        <Divider
          color={colors.secondaryDark}
          thickness={2}
          marginVertical={10}
        ></Divider>
        <BigTitle title="Exercices de respiration"></BigTitle>
        <View
          ref={breathingExercisesRef}
          collapsable={false}
          onLayout={() => {}}
          style={styles.cardsContainer}
        >
          <BreathingExercises scrollEnabled={false} />
        </View>
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
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 1,
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 1,
  },
});

export default Home;
