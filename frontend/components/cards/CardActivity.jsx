import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import relaxationActivityService from "../../api/services/relaxationActivity";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";

const CardActivity = ({ image }) => {
  const [randomActivity, setRandomActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  {
    /* Récupération d'une activité aléatoire */
  }
  const fetchRandomActivity = async () => {
    try {
      setLoading(true);

      // 1. Récupérer toutes les activités
      const activities =
        await relaxationActivityService.getRelaxationActivities();

      // 2. Filtrer pour ne garder que les activités actives (is_active !== 0)
      const activeActivities = activities.filter(
        (activity) => activity.is_active !== 0
      );

      // 3. Vérifier qu'il reste des activités après le filtrage
      if (activeActivities && activeActivities.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeActivities.length);
        const selectedActivity = activeActivities[randomIndex];

        // 4. Récupération du détail de l'activité choisie
        const fullActivity = await relaxationActivityService.getOne(
          selectedActivity.id
        );
        setRandomActivity(fullActivity);
      } else {
        setRandomActivity(null); // Aucune activité active disponible
      }
    } catch (error) {
      console.error("Error fetching random activity:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomActivity();
  }, []);

  if (loading) {
    return (
      <View style={styles.cardContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!randomActivity) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.noActivityText}>
          Aucune activité active disponible
        </Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchRandomActivity}
        >
          <Icon name="autorenew" size={24} color={colors.primary} />
          <Text style={styles.refreshText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{randomActivity.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {randomActivity.description}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={fetchRandomActivity} // Permet de recharger une nouvelle activité aléatoire
        >
          <Icon name="autorenew" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardActivity;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  iconContainer: {
    padding: 8,
  },
});
