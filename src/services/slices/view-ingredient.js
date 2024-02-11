import { createSlice } from '@reduxjs/toolkit';
import { ingredientsInitialState } from './ingredients';

export const viewIngredientInitialState = null;

export const viewIngredientSlice = createSlice({
  name: 'CURRENT_VIEWED_INGREDIENT',
  initialState: ingredientsInitialState,
  reducers: {
    open: (state, action) => action.payload,
    close: (state) => null
  }
});
