import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/navigationSlice';
import matchesReducer from './slices/matchesSlice';
import gamesReducer from './slices/gamesSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    matches: matchesReducer,
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
