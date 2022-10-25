import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { default as Refresh } from "../assets/refresh.png";

type RefreshButtonProps = {
  onPressElement: () => void;
};
export const RefreshButton = ({ onPressElement }: RefreshButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#FAFAFA" : "white",
        },
        styles.container,
      ]}
      onPress={onPressElement}
    >
      <Image source={Refresh} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "80%",
    width: "80%",
  },
});
