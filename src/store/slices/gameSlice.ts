import { mockGameData } from "src/mocks/gamesList";
import { IGameState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameData } from "src/shared/types/types";

const initialState: IGameState = {
  games: mockGameData
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<IGameData>) => {
      state.games.push(action.payload);
    },
    setGames: (state, action: PayloadAction<IGameData[]>) => {
      state.games = action.payload;
    }
  }
});

export const { addGame, setGames } = gameSlice.actions;

export default gameSlice.reducer;
