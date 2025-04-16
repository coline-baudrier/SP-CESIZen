import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../../constants/colors";
import relaxationActivityService from "../../api/services/relaxationActivity";
import favoriteService from "../../api/services/favoriteService";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";

const CardActivity = ({
  image,
  activity,
  onRefresh,
  showRefreshButton = true,
  showFavoriteButton = true,
  userId,
}) => {
  const [currentActivity, setCurrentActivity] = useState(activity || null);
  const [loading, setLoading] = useState(!activity);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const fetchRandomActivity = async () => {
    try {
      setLoading(true);
      const activities =
        await relaxationActivityService.getRelaxationActivities();
      const activeActivities = activities.filter((a) => a.is_active !== 0);

      if (activeActivities?.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeActivities.length);
        const selectedActivity = await relaxationActivityService.getOne(
          activeActivities[randomIndex].id
        );
        setCurrentActivity(selectedActivity);
        checkFavoriteStatus(selectedActivity.id);
      } else {
        setCurrentActivity(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async (activityId) => {
    try {
      const favoriteStatus = await favoriteService.isFavorite(activityId);
      setIsFavorite(favoriteStatus);
    } catch (error) {
      console.error("Favorite check error:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!currentActivity?.id || favoriteLoading) return;

    try {
      setFavoriteLoading(true);
      if (isFavorite) {
        await favoriteService.removeFavorite(currentActivity.id);
      } else {
        await favoriteService.addFavorite(currentActivity.id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Favorite toggle error:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  useEffect(() => {
    if (activity) {
      setCurrentActivity(activity);
      setLoading(false);
      checkFavoriteStatus(activity.id);
      console.log("Checking favorite for:", activity?.id, "User ID:", userId);
    } else {
      fetchRandomActivity();
    }
  }, [activity]);

  if (loading) {
    return (
      <View style={[styles.cardContainer, styles.loadingContainer]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (!currentActivity) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.noActivityText}>Aucune activité disponible</Text>
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
          <Text style={styles.title}>{currentActivity.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {currentActivity.description}
          </Text>
        </View>

        <View style={styles.iconsContainer}>
          {showFavoriteButton && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={toggleFavorite}
              disabled={favoriteLoading}
            >
              <Icon
                name={isFavorite ? "favorite" : "favorite-outline"}
                size={24}
                color={isFavorite ? colors.error : colors.textSecondary}
              />
            </TouchableOpacity>
          )}

          {showRefreshButton && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onRefresh || fetchRandomActivity}
            >
              <Icon name="autorenew" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
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
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    padding: 8,
  },
  noActivityText: {
    textAlign: "center",
    padding: 20,
    color: colors.textSecondary,
  },
  refreshButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  refreshText: {
    marginLeft: 5,
    color: colors.primary,
  },
});

export default CardActivity;
