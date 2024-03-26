import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../models';

export interface IIngredientDraggingState {
  item: IIngredient | null;
  isDragging: boolean;
}

export const ingredientDraggingInitialState: IIngredientDraggingState = {
  item: null,
  isDragging: false
};

export const ingredientDraggingSlice = createSlice({
  name: 'INGREDIENT_DRAGGING',
  initialState: ingredientDraggingInitialState,
  reducers: {
    drag: (_, action: PayloadAction<IIngredient>) => ({
      item: action.payload,
      isDragging: true
    }),
    drop: (_) => {
      return ingredientDraggingInitialState;
    }
  }
});
