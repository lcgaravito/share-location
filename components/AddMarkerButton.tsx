import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { default as AddImage } from "../assets/add.png";
import { useAppDispatch } from "../redux/hooks";
import { setAddMarkerMode } from "../redux/slices/locationsSlice";

type AddMarkerButtonProps = {
  width?: number;
  height?: number;
};

export const AddMarkerButton = ({ width, height }: AddMarkerButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <Pressable
      style={{ ...styles.container, width: width || 40, height: height || 40 }}
      onPress={() => dispatch(setAddMarkerMode(true))}
    >
      <Image source={AddImage} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
