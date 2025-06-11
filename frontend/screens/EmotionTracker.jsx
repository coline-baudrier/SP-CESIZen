import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import CardFeelings from "../components/cards/CardFeelings";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Divider from "../components/utils/Divider";
import BigTitle from "../components/texts/BigTitle";
import emotionTrackerService from "../api/services/emotionTrackerService";
import colors from "../constants/colors";

const periods = [{ id: "all", label: "Toutes" }];

const EmotionTracker = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log("Component mounted or period changed");
    fetchEntries();
  }, [selectedPeriod]);

  const fetchEntries = async () => {
    try {
      console.log("Starting to fetch entries...");
      setLoading(true);
      const token = userInfo?.token;

      if (!token) {
        console.log("No token available");
        return;
      }

      console.log(`Fetching entries for period: ${selectedPeriod}`);
      let data;
      if (selectedPeriod === "all") {
        data = await emotionTrackerService.getJournalEntries(token);
      } else {
        data = await emotionTrackerService.getJournalEntriesByPeriod(
          token,
          selectedPeriod
        );
      }

      console.log("Data received from API:", data);

      if (data && Array.isArray(data)) {
        const sortedEntries = data.sort(
          (a, b) =>
            new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
        );

        setEntries(sortedEntries);
      } else {
        console.log("Invalid data format received:", data);
        setEntries([]);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    console.log("Refreshing data...");
    setRefreshing(true);
    fetchEntries();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        <BigTitle title="Mon journal d'émotions" />

        <View style={styles.filterContainer}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.filterButton,
                selectedPeriod === period.id && styles.selectedFilterButton,
              ]}
              onPress={() => {
                console.log(`Period selected: ${period.id}`);
                setSelectedPeriod(period.id);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedPeriod === period.id && styles.selectedFilterText,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Divider
          color={colors.secondaryDark}
          thickness={2}
          marginVertical={10}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <CardFeelings
              key={entry.id}
              titleCard={entry.emotion_name || entry.title || "Sans titre"}
              dateCard={formatDate(entry.created_at || entry.date)}
              noteCard={entry.note || entry.description || ""}
              onPress={() => {
                navigation.navigate("EmotionDetail", { emotionId: entry.id });
              }}
            />
          ))
        ) : (
          <Text style={styles.noEntriesText}>
            {loading
              ? "Chargement..."
              : "Aucune entrée trouvée pour cette période"}
          </Text>
        )}

        <ButtonPrimary
          btnTitle="Ajouter une nouvelle entrée"
          onPress={() => navigation.navigate("CreateEmotion")}
          style={styles.addButton}
        />
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
  scrollContainer: {
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
  },
  selectedFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.secondary,
    fontSize: 14,
  },
  selectedFilterText: {
    color: colors.white,
  },
  noEntriesText: {
    textAlign: "center",
    color: colors.secondary,
    marginVertical: 40,
    fontSize: 16,
  },
  loader: {
    marginVertical: 40,
  },
  addButton: {
    marginTop: 20,
  },
});

export default EmotionTracker;
