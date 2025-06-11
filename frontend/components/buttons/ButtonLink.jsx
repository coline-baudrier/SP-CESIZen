import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";

const ButtonLink = (props) => {
  return (
    <Pressable onPress={props.onPressHandler}>
      <View style={{ ...styles.btn, ...props.style }}>
        <Text style={styles.textBtn}>{props.btnTitle}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonLink;

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  textBtn: {
    color: colors.primaryDark,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Ubuntu_400Medium",
    textDecorationLine: "underline",
  },
});
