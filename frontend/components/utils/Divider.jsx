import { View, StyleSheet } from "react-native";
import React from "react";

const Divider = ({ color = "#e0e0e0", thickness = 1, marginVertical = 8 }) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
  },
});

export default Divider;
