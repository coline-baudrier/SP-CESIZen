import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import React from "react";

const BigTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default BigTitle;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginTop: 10,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Lora_400Regular_Italic",
    fontSize: 28,
    color: colors.textPrimary,
  },
});
