import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardResultStress = ({ score, testName, date, description }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.scoreText}>{score}</Text>

      <View style={styles.metaContainer}>
        <Text style={styles.testNameText}>{testName}</Text>
        <Text style={styles.dateText}>
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

// TODO : Mettre les couleurs du thème
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  testNameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  dateText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  descriptionText: {
    fontSize: 14,
    color: "#34495e",
    lineHeight: 20,
  },
});

export default CardResultStress;
