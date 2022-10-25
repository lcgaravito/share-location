import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../constants";
import MapView from "react-native-maps";
import { useMap } from "../hooks/useMap";
import { BottomSheet, CustomMarker } from "../components";
import { TopBar } from "../components/TopBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLocations } from "../redux/slices/locationsSlice";

const MapScreen = () => {
  const {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  } = useMap();
  const { currentLocation, markers } = useAppSelector(selectLocations);
  const dispatch = useAppDispatch();
  useEffect(() => {
    handelResetInitialPosition(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      <TopBar onPressElement={() => handelResetInitialPosition(dispatch)} />
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 41.3995345,
          longitude: 2.1909796,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
      >
        {currentLocation && (
          <CustomMarker
            id={"currentLocation"}
            title="Current Location"
            selectedMarker={selectedMarker}
            color={Colors.secondary}
            latitude={currentLocation.latitude}
            longitude={currentLocation.longitude}
          />
        )}
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            id={marker.id}
            title={marker.name}
            selectedMarker={selectedMarker}
            color={marker.color}
            latitude={marker.latitude}
            longitude={marker.longitude}
          ></CustomMarker>
        ))}
      </MapView>
      <BottomSheet onPressElement={handleNavigateToPoint} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
