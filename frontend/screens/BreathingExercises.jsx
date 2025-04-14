import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import breathingExerciseService from "../api/services/breathingExercise.js";
import MiniTitle from "../components/texts/MiniTitle.jsx";
import colors from "../constants/colors.js";

const BreathingExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await breathingExerciseService.getBreathingExercises();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseCard}>
            <View style={styles.headerContainer}>
              <MiniTitle title={item.name} />
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Lancer</Text>
                <MaterialIcons
                  name="play-arrow"
                  size={18}
                  color={colors.textOnPrimary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.durationsRow}>
              <View style={styles.durationItem}>
                <MaterialIcons
                  name="arrow-upward"
                  size={16}
                  color={colors.success}
                />
                <Text style={styles.durationText}>{item.inhale_duration}s</Text>
              </View>

              <View style={styles.durationSeparator}>|</View>

              <View style={styles.durationItem}>
                <MaterialIcons name="pause" size={16} color={colors.warning} />
                <Text style={styles.durationText}>{item.hold_duration}s</Text>
              </View>

              <View style={styles.durationSeparator}>|</View>

              <View style={styles.durationItem}>
                <MaterialIcons
                  name="arrow-downward"
                  size={16}
                  color={colors.danger}
                />
                <Text style={styles.durationText}>{item.exhale_duration}s</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: colors.danger,
    fontSize: 16,
  },
  exerciseCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  durationsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  durationText: {
    marginLeft: 4,
    fontSize: 18,
    color: colors.text,
  },
  durationSeparator: {
    color: colors.lightGray,
    marginHorizontal: 4,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  startButtonText: {
    color: colors.textOnPrimary,
    marginRight: 4,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default BreathingExercises;
