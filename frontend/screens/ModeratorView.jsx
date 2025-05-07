import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import BigTitle from "../components/texts/BigTitle";
import Divider from "../components/utils/Divider";
import colors from "../constants/colors";

const ModeratorView = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BigTitle title="Panneau de modération" />

      {/* Section Utilisateurs */}
      <View style={styles.section}>
        <ButtonPrimary
          btnTitle="Gestion des utilisateurs"
          onPress={() => navigation.navigate("UserManagement")}
          style={styles.button}
        />
        <ButtonPrimary
          btnTitle="Création d'un nouvel administrateur"
          onPress={() =>
            navigation.navigate("CreateAccount", { isAdminCreation: true })
          }
          style={styles.button}
        />
      </View>

      <Divider color={colors.secondaryDark} thickness={2} marginVertical={20} />

      {/* Section Activités */}
      <View style={styles.section}>
        <ButtonPrimary
          btnTitle="Gestion des activités"
          onPress={() => navigation.navigate("ActivityManagement")}
          style={styles.button}
        />
        <ButtonPrimary
          btnTitle="Ajouter une nouvelle activité"
          onPress={() => navigation.navigate("NewActivity")}
          style={styles.button}
        />
      </View>

      <Divider color={colors.secondaryDark} thickness={2} marginVertical={20} />

      {/* Section Exercices de respiration */}
      <View style={styles.section}>
        <ButtonPrimary
          btnTitle="Gestion des exercices de respiration"
          onPress={() => navigation.navigate("BreathingExerciseManagement")}
          style={styles.button}
        />
        <ButtonPrimary
          btnTitle="Ajouter un nouvel exercice"
          onPress={() => navigation.navigate("NewBreathingExercise")}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 15,
    marginTop: 10,
  },
});

export default ModeratorView;
