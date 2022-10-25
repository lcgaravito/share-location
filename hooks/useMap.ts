import * as Location from "expo-location";
import { useState, useRef, useCallback } from "react";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import { setCurrentLocation } from "../redux/slices/locationsSlice";
import { AppDispatch } from "../redux/store";

const DEVIATION = 0.0002;

export function useMap() {
  let mapRef = useRef<MapView>(null);
  const [selectedMarker, setSelectedMarker] = useState<string>("");

  const handleNavigateToPoint = useCallback(
    (id: string, lat: number, long: number) => {
      if (mapRef.current) {
        mapRef.current.animateCamera(
          {
            center: {
              latitude: lat - DEVIATION,
              longitude: long,
            },
            zoom: 18.5,
          },
          {
            duration: 500,
          }
        );
      }
      setSelectedMarker(id);
    },
    [mapRef, setSelectedMarker]
  );

  const handelResetInitialPosition = useCallback(
    (dispatch: AppDispatch) => {
      const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permisos insuficientes",
            "Necesita dar permisos a la localización para usar la applicación",
            [{ text: "Ok" }]
          );
          return false;
        }
        return true;
      };

      const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissions();
        if (!isLocationOk) return;

        const location = await Location.getCurrentPositionAsync({
          timeInterval: 5000,
        });
        dispatch(
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
        );
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            },
            500
          );
          setSelectedMarker("currentLocation");
        }
      };
      handleGetLocation();
    },
    [mapRef, setSelectedMarker]
  );

  return {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  };
}
