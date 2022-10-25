import React from "react";
import { Marker, MarkerProps } from "react-native-maps";
import Animated from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useMarkerAnimation } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants";

type CustomMarkerProps = {
  id: string;
  selectedMarker: string;
  color: string;
  latitude: number;
  longitude: number;
} & Omit<MarkerProps, "coordinate">;

export const CustomMarker = ({
  id,
  selectedMarker,
  color,
  latitude,
  longitude,
  ...markerProps
}: CustomMarkerProps) => {
  const animatedStyles = useMarkerAnimation({ id, selectedMarker });

  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      {...markerProps}
    >
      <View style={styles.markerWrapper}>
        <Animated.View
          style={[
            styles.marker,
            {
              backgroundColor: color,
            },
            animatedStyles,
          ]}
        >
          {id === "currentLocation" && (
            <MaterialIcons
              name="my-location"
              size={21}
              color={Colors.primary}
            />
          )}
        </Animated.View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrapper: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 25,
    width: 25,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
  },
});
