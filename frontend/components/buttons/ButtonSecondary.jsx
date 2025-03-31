import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";

const ButtonSecondary = (props) => {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => []}>
      <View style={{ ...styles.btn, ...props.style }}>
        <Text style={styles.textBtn}>{props.btnTitle}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonSecondary;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.secondary,
    width: "45%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 15,
    alignSelf: "center",
  },
  textBtn: {
    color: colors.text,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Ubuntu_400Medium",
  },
});
