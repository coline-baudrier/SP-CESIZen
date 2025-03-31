import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../../constants/colors";
import React from "react";

const ButtonCard = ({ title, image, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.secondaryLight,
    width: "40%",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  title: {
    fontSize: 18,
    fontFamily: "Lora_500Medium",
    textAlign: "center",
  },
});

export default ButtonCard;
