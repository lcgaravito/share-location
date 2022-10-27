import React from "react";
import { StyleSheet, View } from "react-native";
import { AddMarkerButton } from "./AddMarkerButton";
import { RefreshButton } from "./RefreshButton";

type TopBarProps = {
  onPressElement: () => void;
};

export function TopBar({ onPressElement }: TopBarProps) {
  return (
    <View style={styles.container}>
      <AddMarkerButton />
      <RefreshButton onPressElement={onPressElement} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 40,
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
