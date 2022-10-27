import React from "react";
import { Marker, MarkerProps } from "react-native-maps";
import Animated from "react-native-reanimated";
import { Image, StyleSheet, View } from "react-native";
import { useMarkerAnimation } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants";

type CustomMarkerProps = {
  id: string;
  selectedMarker: string;
  color: string;
  latitude: number;
  longitude: number;
  imageURI?: string;
} & Omit<MarkerProps, "coordinate">;

export const CustomMarker = ({
  id,
  selectedMarker,
  color,
  latitude,
  longitude,
  imageURI,
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                width: "100%",
                height: "100%",
                padding: "auto",
              }}
            >
              <MaterialIcons
                name="my-location"
                size={20}
                color={Colors.white}
              />
            </View>
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {imageURI && (
              <Image
                source={{ uri: imageURI }}
                style={{
                  height: "80%",
                  width: "80%",
                  borderRadius: 25,
                }}
              />
            )}
          </View>
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
    borderRadius: 12.5,
    borderColor: "white",
    borderWidth: 2,
  },
});
