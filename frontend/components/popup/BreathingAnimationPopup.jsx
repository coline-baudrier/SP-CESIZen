import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const BreathingAnimationPopup = ({ exercise, visible, onClose }) => {
  // États pour le timer
  const [currentPhase, setCurrentPhase] = useState("INSPIREZ");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // Références
  const timer = useRef(null);
  const startTime = useRef(null);

  // Durées avec valeurs par défaut
  const inhale = Math.max(1, Number(exercise?.inhale_duration) || 4);
  const hold = Math.max(1, Number(exercise?.hold_duration) || 4);
  const exhale = Math.max(1, Number(exercise?.exhale_duration) || 4);
  const totalCycleDuration = inhale + hold + exhale;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const stopAnimation = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    startTime.current = null;
  };

  const startAnimation = () => {
    stopAnimation();

    setCycleCount(0);
    setTotalSeconds(0);
    startTime.current = Date.now();

    let currentTime = 0;

    timer.current = setInterval(() => {
      // Calcul du temps total
      setTotalSeconds(Math.floor((Date.now() - startTime.current) / 1000));

      currentTime = (currentTime + 1) % totalCycleDuration;

      // Nouveau cycle ?
      if (currentTime === 0) {
        setCycleCount((prev) => prev + 1);
      }

      // Gestion des phases
      if (currentTime < inhale) {
        setCurrentPhase("INSPIREZ");
        setSecondsLeft(inhale - currentTime);
      } else if (currentTime < inhale + hold) {
        setCurrentPhase("RETENEZ");
        setSecondsLeft(inhale + hold - currentTime);
      } else {
        setCurrentPhase("EXPIREZ");
        setSecondsLeft(totalCycleDuration - currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (visible && exercise) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return stopAnimation;
  }, [visible, exercise]);

  if (!visible || !exercise) return null;

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Compteurs en haut */}
          <View style={styles.countersContainer}>
            <View style={styles.counterBox}>
              <Text style={styles.counterLabel}>Cycles</Text>
              <Text style={styles.counterValue}>{cycleCount}</Text>
            </View>
            <View style={styles.counterBox}>
              <Text style={styles.counterLabel}>Durée</Text>
              <Text style={styles.counterValue}>
                {formatTime(totalSeconds)}
              </Text>
            </View>
          </View>

          {/* Phase actuelle */}
          <Text style={styles.phaseText}>{currentPhase}</Text>
          <Text style={styles.timerText}>{secondsLeft}s</Text>

          {/* Détails des durées */}
          <View style={styles.durationInfo}>
            <Text style={styles.durationLabel}>Inspirez: {inhale}s</Text>
            <Text style={styles.durationLabel}>Retenez: {hold}s</Text>
            <Text style={styles.durationLabel}>Expirez: {exhale}s</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Arrêter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  countersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  counterBox: {
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
    minWidth: 100,
  },
  counterLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  phaseText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginVertical: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  durationInfo: {
    width: "100%",
    marginBottom: 20,
  },
  durationLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: colors.backgroundAlt,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.textSecondary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default BreathingAnimationPopup;
