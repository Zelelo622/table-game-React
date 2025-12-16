import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllGames, fetchGameById } from "src/shared/api/games";
import { IGameData } from "src/shared/types/types";

interface IGameState {
  games: IGameData[];
  selectedGame: IGameData | null;
  loading: boolean;
  error: string | null;
}

const initialState: IGameState = {
  games: [],
  selectedGame: null,
  loading: false,
  error: null
};

export const fetchGames = createAsyncThunk<
  IGameData[],
  void,
  { rejectValue: string }
>("game/fetchGames", async (_, { rejectWithValue }) => {
  try {
    return await fetchAllGames();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return rejectWithValue(message);
  }
});

export const fetchGameDetails = createAsyncThunk<
  IGameData,
  string,
  { rejectValue: string }
>("game/fetchGameDetails", async (gameId, { rejectWithValue }) => {
  try {
    const game = await fetchGameById(gameId);
    if (!game) return rejectWithValue("Игра не найдена");
    return game;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return rejectWithValue(message);
  }
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGames.fulfilled,
        (state, action: PayloadAction<IGameData[]>) => {
          state.loading = false;
          state.games = action.payload;
        }
      )
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка загрузки";
      })
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedGame = null;
      })
      .addCase(
        fetchGameDetails.fulfilled,
        (state, action: PayloadAction<IGameData>) => {
          state.loading = false;
          state.selectedGame = action.payload;
        }
      )
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка загрузки игры";
        state.selectedGame = null;
      });
  }
});

export default gameSlice.reducer;
