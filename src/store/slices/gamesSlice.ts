import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGamesCatalogue } from '@/services/gamesService';
import type { CardGameIcon, GameCard } from '@/types/game';

interface GamesState {
  casinoGames: GameCard[];
  popularGames: GameCard[];
  cardGames: CardGameIcon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GamesState = {
  casinoGames: [],
  popularGames: [],
  cardGames: [],
  status: 'idle',
  error: null,
};

export const loadGamesCatalogue = createAsyncThunk(
  'games/loadGamesCatalogue',
  () => fetchGamesCatalogue(),
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGamesCatalogue.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadGamesCatalogue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.casinoGames = action.payload.casinoGames;
        state.popularGames = action.payload.popularGames;
        state.cardGames = action.payload.cardGames;
      })
      .addCase(loadGamesCatalogue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load games';
      });
  },
});

export default gamesSlice.reducer;
