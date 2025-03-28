import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sky,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Lora_500Medium",
    color: colors.charcoal,
    fontSize: 25,
  },
});
