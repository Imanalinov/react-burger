import { createSlice } from '@reduxjs/toolkit';

export const ingredientDraggingInitialState = {
  item: null,
  isDragging: false
};

export const ingredientDraggingSlice = createSlice({
  name: 'INGREDIENT_DRAGGING',
  initialState: ingredientDraggingInitialState,
  reducers: {
    drag: (state, action) => ({
      item: action.payload,
      isDragging: true
    }),
    drop: (state) => {
      return ingredientDraggingInitialState;
    }
  }
});
