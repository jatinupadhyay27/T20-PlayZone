import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLiveMatches } from '@/services/matchesService';
import { saveCachedMatches, loadCachedMatches } from '@/utils/matchesCache';
import type { MatchGroup, SupportedSport } from '@/types/match';

interface MatchesState {
  groups: MatchGroup[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // False once a fetch fails and we're showing cached/previous data instead
  // of a fresh response — the UI uses this to warn the data may be outdated.
  isLive: boolean;
  lastUpdated: string | null;
  sport: SupportedSport | null;
}

const initialState: MatchesState = {
  groups: [],
  status: 'idle',
  error: null,
  isLive: true,
  lastUpdated: null,
  sport: null,
};

export const loadLiveMatches = createAsyncThunk(
  'matches/loadLiveMatches',
  async (sport: SupportedSport) => {
    const groups = await fetchLiveMatches(sport);
    saveCachedMatches(sport, groups);
    return groups;
  },
);

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLiveMatches.pending, (state, action) => {
        // Switching sport — drop the previous sport's matches so we never
        // show, say, cricket fixtures under the football tab while loading.
        if (action.meta.arg !== state.sport) {
          state.groups = [];
          state.lastUpdated = null;
        }
        state.sport = action.meta.arg;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadLiveMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
        state.isLive = true;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(loadLiveMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load matches';
        state.isLive = false;

        // Nothing in memory yet (e.g. a fresh page load while the API is
        // down) — fall back to the last successful fetch for this sport.
        if (state.groups.length === 0) {
          const cached = loadCachedMatches(action.meta.arg);
          if (cached) {
            state.groups = cached.groups;
            state.lastUpdated = cached.savedAt;
          }
        }
      });
  },
});

export default matchesSlice.reducer;
