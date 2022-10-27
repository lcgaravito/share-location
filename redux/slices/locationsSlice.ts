import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_GEOCODING } from "../../constants";
import { deleteLocation, fetchLocations, insertLocation } from "../../db";
import { COLORS_MARKER_DATA } from "../../db/markers";
import { Location, MarkerType } from "../../types";
import { AppThunk, RootState } from "../store";

interface LocationsState {
  loading: boolean;
  currentLocation?: Location;
  markers: MarkerType[];
  addMarkerMode: boolean;
}

const initialState: LocationsState = {
  loading: false,
  markers: [],
  addMarkerMode: false,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setCurrentLocation: (state, { payload }: PayloadAction<Location>) => {
      state.currentLocation = payload;
    },
    addMarker: (state, { payload }: PayloadAction<MarkerType>) => {
      state.markers.unshift(payload);
    },
    setMarkers: (state, { payload }: PayloadAction<MarkerType[]>) => {
      state.markers = payload;
    },
    removeLocationWithId: (state, { payload }: PayloadAction<string>) => {
      state.markers = state.markers.filter((marker) => marker.id !== payload);
    },
    setAddMarkerMode: (state, { payload }: PayloadAction<boolean>) => {
      state.addMarkerMode = payload;
    },
  },
});

export const {
  setLoading,
  setCurrentLocation,
  addMarker,
  setMarkers,
  removeLocationWithId,
  setAddMarkerMode,
} = locationsSlice.actions;

export const saveLocation =
  ({
    name,
    image,
    location,
  }: {
    name: string;
    image: string;
    location: Location;
  }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    const response = await fetch(
      URL_GEOCODING(location.latitude, location.longitude)
    );
    if (!response.ok)
      throw new Error("No se ha podido comunicar con Google Maps API");
    const resData = await response.json();
    if (!resData.results)
      throw new Error(
        "No se han encontrado datos para las coordenadas seleccionadas"
      );
    const direction = resData.results[0].formatted_address;

    const color =
      COLORS_MARKER_DATA[Math.floor(Math.random() * COLORS_MARKER_DATA.length)];

    try {
      const result = await insertLocation({
        name,
        image,
        direction,
        color,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      console.log("result: ", result);
      dispatch(
        addMarker({
          id: result.insertId?.toString() || Math.random().toString(),
          name,
          image,
          direction,
          color,
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false));
  };

export const getLocations = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await fetchLocations();
    console.log("result: ", result);
    dispatch(setMarkers(result.rows._array));
  } catch (error) {
    console.log(error);
  }
  dispatch(setLoading(false));
};

export const removeLocation =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const result = await deleteLocation(id);
      console.log("result: ", result);
      dispatch(removeLocationWithId(id));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

export const selectLocations = (state: RootState) => state.locations;

export default locationsSlice.reducer;
