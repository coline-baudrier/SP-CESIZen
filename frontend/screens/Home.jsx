import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  findNodeHandle,
  Text,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useRef, useEffect, useState } from "react";
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
import emotionTrackerService from "../api/services/emotionTrackerService";

const Home = ({ navigation }) => {
  const { userInfo, token, isLoading, logout, role } = useContext(AuthContext);
  const scrollViewRef = useRef(null);
  const breathingExercisesRef = useRef(null);
  const [recentEmotions, setRecentEmotions] = useState([]);
  const [loadingEmotions, setLoadingEmotions] = useState(true);

  useEffect(() => {
    if (role !== "guest") {
      fetchRecentEmotions();
    }
  }, [role]);

  const fetchRecentEmotions = async () => {
    try {
      const token = userInfo?.token;
      if (!token) return;

      const entries = await emotionTrackerService.getJournalEntries(token);
      // Trier par date et prendre les 3 premières
      const sortedEntries = entries.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentEmotions(sortedEntries.slice(0, 3));
    } catch (error) {
      console.error("Error fetching recent emotions:", error);
    } finally {
      setLoadingEmotions(false);
    }
  };

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

  console.log("UserInfo in Home:", userInfo, token);

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
          {role !== "guest" && (
            <ButtonCard
              title="Humeur"
              image={require("../assets/backgrounds/humeur.jpg")}
              onPress={() => {
                navigation.navigate("EmotionTracker");
              }}
            />
          )}
          {role !== "guest" && (
            <ButtonCard
              title="Stress"
              image={require("../assets/backgrounds/humeur.jpg")}
              onPress={() => {
                console.log("Appui sur Stress");
              }}
            />
          )}
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
            title="Respiration"
            image={require("../assets/backgrounds/humeur.jpg")}
            onPress={scrollToBreathingExercises}
          />
        </View>

        <Divider
          color={colors.secondaryDark}
          thickness={2}
          marginVertical={1}
        ></Divider>
        {role !== "guest" && (
          <>
            <BigTitle title="Mes émotions"></BigTitle>

            {loadingEmotions ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : recentEmotions.length > 0 ? (
              recentEmotions.map((emotion, index) => (
                <CardFeelings
                  key={index}
                  titleCard={emotion.title || "Sans titre"}
                  dateCard={formatDate(emotion.date)}
                  noteCard={emotion.description}
                  onPress={() =>
                    navigation.navigate("EmotionDetail", {
                      emotionId: emotion.id,
                    })
                  }
                />
              ))
            ) : (
              <Text style={styles.noEmotionsText}>
                Aucune émotion enregistrée
              </Text>
            )}

            <ButtonPrimary
              btnTitle="Enregistrer mon humeur du jour"
              onPress={() => navigation.navigate("CreateEmotion")}
            />

            <Divider
              color={colors.secondaryDark}
              thickness={2}
              marginVertical={10}
            ></Divider>
          </>
        )}
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
        {role !== "guest" && (
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
                console.log(
                  "Navigation Lancer un diagnostic de stress (choix)"
                );
              }}
            ></ButtonPrimary>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Hier";
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  }
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
  noEmotionsText: {
    textAlign: "center",
    color: colors.secondary,
    marginVertical: 20,
  },
});

export default Home;
