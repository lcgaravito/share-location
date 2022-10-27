import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";
import { Colors } from "../constants";

const Input = ({ style, ...textInputProps }: TextInputProps) => {
  return <TextInput style={[styles.input, style]} {...textInputProps} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderWidthColor: Colors.gray,
    backgroundColor: Colors.white,
    color: Colors.primary,
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
  },
});
