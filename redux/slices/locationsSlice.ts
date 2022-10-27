import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_GEOCODING } from "../../constants";
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
      state.markers.push(payload);
    },
    setAddMarkerMode: (state, { payload }: PayloadAction<boolean>) => {
      state.addMarkerMode = payload;
    },
  },
});

export const { setLoading, setCurrentLocation, addMarker, setAddMarkerMode } =
  locationsSlice.actions;

export const saveLocation =
  ({ name, location }: { name: string; location: Location }): AppThunk =>
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

    const address = resData.results[0].formatted_address;
    console.log("address", address);

    dispatch(
      addMarker({
        id: Math.random().toString(),
        latitude: location.latitude,
        longitude: location.longitude,
        color:
          COLORS_MARKER_DATA[
            Math.floor(Math.random() * COLORS_MARKER_DATA.length)
          ],
        name,
        direction: address,
      })
    );
    dispatch(setLoading(false));
  };

export const selectLocations = (state: RootState) => state.locations;

export default locationsSlice.reducer;
