import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileUser = () => {
  const { userInfo } = useContext(AuthContext);
  return (
    <View>
      <Text>ProfileUser</Text>
    </View>
  );
};

export default ProfileUser;

const styles = StyleSheet.create({});
