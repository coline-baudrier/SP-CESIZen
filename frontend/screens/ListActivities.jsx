import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Switch,
  RefreshControl,
} from "react-native";
import colors from "../constants/colors";
import BigTitle from "../components/texts/BigTitle";
import relaxationActivityService from "../api/services/relaxationActivityService";
import CardActivity from "../components/cards/CardActivity";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import favoriteService from "../api/services/favoriteActivityService";

const ListActivities = () => {
  const { userInfo, role } = useContext(AuthContext);
  const [allActivities, setAllActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const activities =
        await relaxationActivityService.getRelaxationActivities();
      const activeActivities = activities.filter((a) => a.is_active !== 0);
      setAllActivities(activeActivities);

      if (showFavoritesOnly) {
        const favorites = await favoriteService.getFavorites();
        const favoriteIds = new Set(favorites.map((fav) => fav.id));
        setFilteredActivities(
          activeActivities.filter((activity) => favoriteIds.has(activity.id))
        );
      } else {
        setFilteredActivities(activeActivities);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (allActivities.length > 0) {
      if (showFavoritesOnly) {
        // On filtre côté client pour une meilleure réactivité
        favoriteService.getFavorites().then((favorites) => {
          const favoriteIds = new Set(favorites.map((fav) => fav.id));
          setFilteredActivities(
            allActivities.filter((activity) => favoriteIds.has(activity.id))
          );
        });
      } else {
        setFilteredActivities(allActivities);
      }
    }
  }, [showFavoritesOnly]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchActivities();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BigTitle title="Activités de relaxation" />
        {role !== "guest" && (
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Favoris seulement</Text>
            <Switch
              value={showFavoritesOnly}
              onValueChange={setShowFavoritesOnly}
              trackColor={{ true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        )}
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <CardActivity
              key={activity.id}
              activity={activity}
              image={require("../assets/backgrounds/humeur.jpg")}
              showRefreshButton={false}
              userId={userInfo?.profile?.id}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.noActivitiesText}>
              {showFavoritesOnly
                ? "Vous n'avez pas encore d'activités favorites"
                : "Aucune activité disponible"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  toggleText: {
    marginRight: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 20,
  },
  noActivitiesText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default ListActivities;
