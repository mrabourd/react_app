import { createSlice, configureStore } from '@reduxjs/toolkit';

import themeReducer from './themeSlice';
import favoritesReducer from "./favoritesSlice";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => (store.getState()))

