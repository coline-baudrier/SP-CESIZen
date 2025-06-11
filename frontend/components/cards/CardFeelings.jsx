import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import Divider from "../utils/Divider";
import Icon from "react-native-vector-icons/FontAwesome";

const CardFeelings = ({ titleCard, dateCard, noteCard, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{titleCard}</Text>
          <View style={styles.rightHeader}>
            <Text style={styles.date}>{dateCard}</Text>
            <Icon
              name="chevron-right"
              size={14}
              color={colors.secondary}
              style={styles.icon}
            />
          </View>
        </View>
        <Divider
          color={colors.secondaryDark}
          thickness={1}
          marginVertical={8}
        />
        <Text style={styles.note} numberOfLines={3} ellipsizeMode="tail">
          {noteCard}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardFeelings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginLeft: 5,
  },
  pressable: {
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  date: {
    fontSize: 14,
    color: colors.secondary,
  },
  note: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
