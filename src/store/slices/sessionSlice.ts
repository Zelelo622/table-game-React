import { sessionsList } from "src/mocks/sessionsList";
import { ISessionState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISession } from "src/shared/types/types";

const initialState: ISessionState = {
  sessions: sessionsList
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<ISession>) => {
      state.sessions.unshift(action.payload);
    }
  }
});

export const { addSession } = sessionSlice.actions;

export default sessionSlice.reducer;
