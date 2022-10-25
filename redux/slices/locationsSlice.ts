import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MARKERS_DATA } from "../../db/markers";
import { Location, MarkerType } from "../../types";
import { RootState } from "../store";

interface LocationsState {
  loading: boolean;
  currentLocation?: Location;
  markers: MarkerType[];
}

const initialState: LocationsState = {
  loading: false,
  markers: MARKERS_DATA,
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
  },
});

export const { setLoading, setCurrentLocation } = locationsSlice.actions;

export const selectLocations = (state: RootState) => state.locations;

export default locationsSlice.reducer;
