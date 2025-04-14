import React from "react";
import colors from "../../constants/colors";
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

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.error,
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
    color: colors.textPrimary,
  },
  dateText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default CardResultStress;
