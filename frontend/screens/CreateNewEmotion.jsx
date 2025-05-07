import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import BigTitle from "../components/texts/BigTitle";
import Divider from "../components/utils/Divider";
import colors from "../constants/colors";
import emotionTrackerService from "../api/services/emotionTrackerService";

// Liste des émotions en dur comme dans votre base de données
const EMOTIONS = [
  { id: 1, name: "Fierté", base_emotion: "Joie" },
  { id: 2, name: "Contentement", base_emotion: "Joie" },
  { id: 3, name: "Enchantement", base_emotion: "Joie" },
  { id: 4, name: "Excitation", base_emotion: "Joie" },
  { id: 5, name: "Admiration", base_emotion: "Joie" },
  { id: 6, name: "Gratitude", base_emotion: "Joie" },
  { id: 7, name: "Frustration", base_emotion: "Colère" },
  { id: 8, name: "Irritation", base_emotion: "Colère" },
  { id: 9, name: "Rage", base_emotion: "Colère" },
  { id: 10, name: "Ressentiment", base_emotion: "Colère" },
  { id: 11, name: "Agacement", base_emotion: "Colère" },
  { id: 12, name: "Hostilité", base_emotion: "Colère" },
  { id: 13, name: "Inquiétude", base_emotion: "Peur" },
  { id: 14, name: "Anxiété", base_emotion: "Peur" },
  { id: 15, name: "Terreur", base_emotion: "Peur" },
  { id: 16, name: "Appréhension", base_emotion: "Peur" },
  { id: 17, name: "Panique", base_emotion: "Peur" },
  { id: 18, name: "Crainte", base_emotion: "Peur" },
  { id: 19, name: "Chagrin", base_emotion: "Tristesse" },
  { id: 20, name: "Mélancolie", base_emotion: "Tristesse" },
  { id: 21, name: "Abattement", base_emotion: "Tristesse" },
  { id: 22, name: "Désespoir", base_emotion: "Tristesse" },
  { id: 23, name: "Solitude", base_emotion: "Tristesse" },
  { id: 24, name: "Dépression", base_emotion: "Tristesse" },
  { id: 25, name: "Étonnement", base_emotion: "Surprise" },
  { id: 26, name: "Stupéfaction", base_emotion: "Surprise" },
  { id: 27, name: "Sidération", base_emotion: "Surprise" },
  { id: 28, name: "Incrédulité", base_emotion: "Surprise" },
  { id: 29, name: "Surprise intense", base_emotion: "Surprise" },
  { id: 30, name: "Confusion", base_emotion: "Dégoût" },
  { id: 31, name: "Répulsion", base_emotion: "Dégoût" },
  { id: 32, name: "Déplaisir", base_emotion: "Dégoût" },
  { id: 33, name: "Nausée", base_emotion: "Dégoût" },
  { id: 34, name: "Dégoût profond", base_emotion: "Dégoût" },
];

// Grouper les émotions par catégorie de base
const EMOTIONS_BY_CATEGORY = EMOTIONS.reduce((acc, emotion) => {
  if (!acc[emotion.base_emotion]) {
    acc[emotion.base_emotion] = [];
  }
  acc[emotion.base_emotion].push(emotion);
  return acc;
}, {});

const NewEmotion = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedEmotion) {
      Alert.alert("Erreur", "Veuillez sélectionner une émotion");
      return;
    }

    if (intensity < 1 || intensity > 10) {
      Alert.alert("Erreur", "L'intensité doit être entre 1 et 10");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await emotionTrackerService.addEntry(userInfo.token, {
        emotion_id: selectedEmotion.id,
        intensity: intensity,
        note: note,
      });

      console.log({
        userId: userInfo.id,
        emotionId: selectedEmotion.id,
        intensity,
        note,
      });

      if (response.error) {
        Alert.alert("Erreur", response.error);
      } else {
        Alert.alert("Succès", "Émotion enregistrée avec succès");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error adding emotion:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIntensityButtons = () => {
    return (
      <View style={styles.intensityContainer}>
        <Text style={styles.label}>Intensité (1-10):</Text>
        <View style={styles.intensityButtons}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.intensityButton,
                intensity === value && styles.selectedIntensityButton,
              ]}
              onPress={() => setIntensity(value)}
            >
              <Text
                style={[
                  styles.intensityButtonText,
                  intensity === value && styles.selectedIntensityButtonText,
                ]}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BigTitle title="Nouvelle émotion" />

      <Text style={styles.label}>Sélectionnez une émotion:</Text>

      {Object.entries(EMOTIONS_BY_CATEGORY).map(([category, emotions]) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.emotionsGrid}>
            {emotions.map((emotion) => (
              <TouchableOpacity
                key={emotion.id}
                style={[
                  styles.emotionButton,
                  selectedEmotion?.id === emotion.id &&
                    styles.selectedEmotionButton,
                ]}
                onPress={() => setSelectedEmotion(emotion)}
              >
                <Text
                  style={[
                    styles.emotionButtonText,
                    selectedEmotion?.id === emotion.id &&
                      styles.selectedEmotionButtonText,
                  ]}
                >
                  {emotion.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <Divider color={colors.secondaryDark} thickness={2} marginVertical={10} />

      {renderIntensityButtons()}

      <Text style={styles.label}>Notes (optionnel):</Text>
      <TextInput
        style={styles.noteInput}
        multiline
        numberOfLines={4}
        placeholder="Décrivez ce que vous ressentez..."
        value={note}
        onChangeText={setNote}
      />

      <ButtonPrimary
        btnTitle={
          isSubmitting ? "Enregistrement..." : "Enregistrer mon émotion"
        }
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondaryDark,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  emotionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  emotionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
  },
  selectedEmotionButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emotionButtonText: {
    fontSize: 14,
    color: colors.secondary,
  },
  selectedEmotionButtonText: {
    color: colors.white,
  },
  intensityContainer: {
    marginBottom: 20,
  },
  intensityButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  intensityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIntensityButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  intensityButtonText: {
    fontSize: 16,
    color: colors.secondary,
  },
  selectedIntensityButtonText: {
    color: colors.white,
  },
  noteInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.white,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    marginBottom: 30,
  },
});

export default NewEmotion;
