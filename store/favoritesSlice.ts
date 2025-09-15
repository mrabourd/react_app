import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Fruit = {
  id: number;
  name: string;
  family: string;
};

type FavoritesState = {
  fruits: Fruit[];
};

const initialState: FavoritesState = {
  fruits: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Fruit>) => {
      if (!state.fruits.some(f => f.id === action.payload.id)) {
        state.fruits.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.fruits = state.fruits.filter(f => f.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Fruit>) => {
      const exists = state.fruits.some(f => f.id === action.payload.id);
      if (exists) {
        state.fruits = state.fruits.filter(f => f.id !== action.payload.id);
      } else {
        state.fruits.push(action.payload);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
