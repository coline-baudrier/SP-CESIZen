import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";

const CardFeelings = ({ titleCard, dateCard, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.cardContainer}>
        <Icon name="smile-o" size={35}></Icon>
        <View style={styles.containerTitle}>
          <Text>{titleCard}</Text>
          <Text>{dateCard}</Text>
        </View>
        <View style={styles.containerDescritpion}>
          <Text>Description</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardFeelings;

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  containerTitle: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "25%",
  },
  containerDescritpion: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "50%",
  },
});
