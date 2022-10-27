import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { useMap } from "../hooks/useMap";
import { AddMarkerForm, BottomSheet, CustomMarker } from "../components";
import { TopBar } from "../components/TopBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLocations } from "../redux/slices/locationsSlice";
import { Location } from "../types";

const MapScreen = () => {
  const {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  } = useMap();
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const { currentLocation, markers, addMarkerMode } =
    useAppSelector(selectLocations);
  const dispatch = useAppDispatch();
  useEffect(() => {
    handelResetInitialPosition(dispatch);
  }, []);

  const handleSelectLocation = (event: MapEvent) => {
    if (addMarkerMode) {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedLocation({
        latitude,
        longitude,
      });
    }
  };

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
        onPress={(event) => handleSelectLocation(event)}
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
        {selectedLocation && (
          <Marker
            title={"Selected Location"}
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            id={marker.id}
            title={marker.name}
            imageURI={marker.image}
            selectedMarker={selectedMarker}
            color={marker.color}
            latitude={marker.latitude}
            longitude={marker.longitude}
          />
        ))}
      </MapView>
      {addMarkerMode ? (
        <AddMarkerForm
          location={selectedLocation}
          onCancel={() => setSelectedLocation(undefined)}
        />
      ) : (
        <BottomSheet onPressElement={handleNavigateToPoint} />
      )}
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
