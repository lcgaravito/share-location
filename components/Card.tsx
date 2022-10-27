import { StyleSheet, View, ViewProps } from "react-native";
import React from "react";
import { Colors } from "../constants";

const Card = ({ style, ...rest }: ViewProps) => {
  return <View style={[styles.root, style]} {...rest} />;
};

export default Card;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: Colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 6,
    backgroundColor: Colors.white,
  },
});
