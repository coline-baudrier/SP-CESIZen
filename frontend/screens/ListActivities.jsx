import { StyleSheet, Text, View, ScrollView } from "react-native";
import colors from "../constants/colors";
import BigTitle from "../components/texts/BigTitle";
import relaxationActivityService from "../api/services/relaxationActivity";
import CardActivity from "../components/cards/CardActivity";
import React, { useState, useEffect } from "react";

const ListActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const allActivities =
          await relaxationActivityService.getRelaxationActivities();

        // Filtrage des activités actives
        const activeActivities = allActivities.filter((a) => a.is_active !== 0);
        setActivities(activeActivities);
      } catch (error) {
        console.error("Error fetching activities: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BigTitle title="Activités de relaxation"></BigTitle>

      <ScrollView>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <CardActivity
              key={activity.id}
              activity={activity}
              image={require("../assets/backgrounds/humeur.jpg")}
              showRefreshButton={false}
            />
          ))
        ) : (
          <Text style={styles.noActivitiesText}>
            Aucune activité disponible
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ListActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  noActivitiesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: colors.gray,
  },
});
