import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import locationsSlice from "./slices/locationsSlice";

const store = configureStore({
  reducer: {
    locations: locationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
