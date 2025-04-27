import React, { useEffect, useState, forwardRef } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import breathingExerciseService from "../api/services/breathingExerciseService";
import MiniTitle from "../components/texts/MiniTitle";
import colors from "../constants/colors";
import BreathingAnimationPopup from "../components/popup/BreathingAnimationPopup";

const BreathingExercises = forwardRef(({ scrollEnabled = true }, ref) => {
  // États
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Effet de chargement
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await breathingExerciseService.getBreathingExercises();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Gestion des exercices
  const handleExercisePress = (exercise) => {
    if (
      !exercise ||
      !exercise.inhale_duration ||
      !exercise.hold_duration ||
      !exercise.exhale_duration
    ) {
      console.error("Exercise data incomplete", exercise);
      return;
    }
    setSelectedExercise({
      ...exercise,
      inhale_duration: Number(exercise.inhale_duration) || 4,
      hold_duration: Number(exercise.hold_duration) || 4,
      exhale_duration: Number(exercise.exhale_duration) || 4,
    });
  };

  const handleClosePopup = () => {
    setSelectedExercise(null);
  };

  // Affichages conditionnels
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
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

  // Rendu principal
  return (
    <View style={styles.container} ref={ref}>
      <FlatList
        scrollEnabled={scrollEnabled}
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            onPress={() => handleExercisePress(item)}
          />
        )}
      />

      <BreathingAnimationPopup
        exercise={selectedExercise}
        visible={!!selectedExercise}
        onClose={handleClosePopup}
      />
    </View>
  );
});

// Sous-composant ExerciseCard
const ExerciseCard = ({ exercise, onPress }) => {
  return (
    <View style={styles.exerciseCard}>
      <View style={styles.headerContainer}>
        <MiniTitle title={exercise.name} />
        <TouchableOpacity style={styles.startButton} onPress={onPress}>
          <Text style={styles.startButtonText}>Lancer</Text>
          <MaterialIcons
            name="play-arrow"
            size={18}
            color={colors.textOnPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.durationsRow}>
        <DurationIndicator
          icon="arrow-upward"
          color={colors.success}
          duration={exercise.inhale_duration}
        />
        <DurationIndicator
          icon="pause"
          color={colors.warning}
          duration={exercise.hold_duration}
        />
        <DurationIndicator
          icon="arrow-downward"
          color={colors.danger}
          duration={exercise.exhale_duration}
        />
      </View>
    </View>
  );
};

// Sous-composant DurationIndicator
const DurationIndicator = ({ icon, color, duration }) => {
  return (
    <View style={styles.durationItem}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={styles.durationText}>{duration}s</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: colors.danger,
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  exerciseCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
    elevation: 2,
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
    marginTop: 8,
  },
  durationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  durationText: {
    marginLeft: 4,
    fontSize: 16,
    color: colors.text,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  startButtonText: {
    color: colors.textOnPrimary,
    marginRight: 6,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default BreathingExercises;
