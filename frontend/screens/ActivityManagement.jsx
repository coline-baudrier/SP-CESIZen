import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Switch,
} from "react-native";
import colors from "../constants/colors";
import BigTitle from "../components/texts/BigTitle";
import relaxationActivityService from "../api/services/relaxationActivityService";
import CardActivity from "../components/cards/CardActivity";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

const ActivityManagement = ({ navigation }) => {
  const { role } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await relaxationActivityService.getRelaxationActivities();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      Alert.alert("Erreur", "Impossible de charger les activités");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = showActiveOnly
    ? activities.filter((a) => a.is_active)
    : activities;

  const handleToggleStatus = async (activityId) => {
    try {
      await relaxationActivityService.toggleActivityStatus(activityId);
      fetchActivities(); // Rafraîchir la liste
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  const handleDelete = (activityId) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer définitivement cette activité ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await relaxationActivityService.deleteActivity(activityId);
              fetchActivities(); // Rafraîchir la liste
              Alert.alert("Succès", "Activité supprimée avec succès");
            } catch (error) {
              Alert.alert("Erreur", error.message);
            }
          },
        },
      ]
    );
  };

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
      <BigTitle title="Gestion des activités" />

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
            <View key={activity.id} style={styles.activityContainer}>
              <CardActivity
                activity={activity}
                image={require("../assets/backgrounds/humeur.jpg")}
                showRefreshButton={false}
              />

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={() => handleToggleStatus(activity.id)}
                  style={styles.actionButton}
                >
                  <Icon
                    name={activity.is_active ? "toggle-on" : "toggle-off"}
                    size={24}
                    color={
                      activity.is_active ? colors.success : colors.secondary
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noActivitiesText}>
            Aucune activité {showActiveOnly ? "active" : ""} disponible
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    marginBottom: 16,
    position: "relative",
  },
  actionsContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 5,
    gap: 5,
  },
  actionButton: {
    padding: 5,
  },
  noActivitiesText: {
    textAlign: "center",
    marginTop: 50,
    color: colors.textSecondary,
    fontSize: 16,
  },
  addButton: {
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  filterText: {
    marginRight: 10,
    color: colors.textSecondary,
  },
});

export default ActivityManagement;
