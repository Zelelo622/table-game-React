import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import sessionReducer from "./slices/sessionSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    session: sessionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
