import { createSlice } from '@reduxjs/toolkit';

export const ingredientsInitialState = {
  loading: true,
  error: false,
  data: []
};

export const ingredientsSlice = createSlice({
  name: 'INGREDIENTS',
  initialState: ingredientsInitialState,
  reducers: {
    getIngredientsRequest: (state) => ({
      loading: true,
      error: false,
      data: []
    }),
    getIngredientsSuccess: (state, action) => ({
      loading: false,
      error: false,
      data: action.payload
    }),
    getIngredientsFailed: (state) => ({
      loading: false,
      error: true,
      data: []
    })
  }
});
