import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";

const ButtonPrimary = (props) => {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => []}>
      <View style={{ ...styles.btn, ...props.style }}>
        <Text style={styles.textBtn}>{props.btnTitle}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    width: "45%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    alignSelf: "center",
  },
  textBtn: {
    color: colors.textOnPrimary,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Ubuntu_500Medium",
  },
});
