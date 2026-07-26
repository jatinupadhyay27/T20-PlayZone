import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLiveMatches } from '@/services/matchesService';
import type { MatchGroup } from '@/types/match';

interface MatchesState {
  groups: MatchGroup[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MatchesState = {
  groups: [],
  status: 'idle',
  error: null,
};

export const loadLiveMatches = createAsyncThunk(
  'matches/loadLiveMatches',
  () => fetchLiveMatches(),
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLiveMatches.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadLiveMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(loadLiveMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load matches';
      });
  },
});

export default matchesSlice.reducer;
