import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqueId from 'lodash/uniqueId';
import { IIngredient } from '../../models';
import { SliceActions } from '../../utils/actions-type';

export interface ISelectedIngredientsState {
  totalPrice: number;
  ingredients: IIngredient[];
  bun: IIngredient | null;
}

export const selectedIngredientsInitialState: ISelectedIngredientsState = {
  totalPrice: 0,
  ingredients: [],
  bun: null
};

export const selectedIngredientsSlice = createSlice({
  name: 'SELECTED_INGREDIENTS',
  initialState: selectedIngredientsInitialState,
  reducers: {
    add: (state: ISelectedIngredientsState, action: PayloadAction<{ ingredient: IIngredient }>) => {
      if (action.payload.ingredient.type === 'bun') {
        return {
          totalPrice: state.totalPrice - ((state.bun?.price || 0) * 2) + (action.payload.ingredient.price * 2),
          ingredients: state.ingredients,
          bun: action.payload.ingredient
        };
      }

      const selectedIngredients = Array.from(state.ingredients);
      const { ingredient } = action.payload;

      selectedIngredients.push({ ...ingredient, uniqueId: uniqueId() });

      return {
        totalPrice: state.totalPrice + ingredient.price,
        ingredients: selectedIngredients,
        bun: state.bun
      };
    },
    deleteIngredient: (state: ISelectedIngredientsState, action: PayloadAction<{ index: number, ingredient: IIngredient}>) => {
      if (state.ingredients.length === 1) {
        return {
          totalPrice: state.bun ? state.bun.price * 2 : 0,
          ingredients: [],
          bun: state.bun
        };
      }

      const { index, ingredient } = action.payload;

      const arr = JSON.parse(JSON.stringify(state.ingredients));
      arr.splice(index, 1);

      return {
        totalPrice: state.totalPrice - ingredient.price,
        ingredients: arr,
        bun: state.bun
      };
    },
    move: (state: ISelectedIngredientsState, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
      const arr = JSON.parse(JSON.stringify(state.ingredients));

      const { dragIndex, hoverIndex } = action.payload;

      arr.splice(dragIndex, 1);
      arr.splice(hoverIndex, 0, state.ingredients[dragIndex]);

      return {
        ...state,
        ingredients: arr
      };
    },
    reset: (_: ISelectedIngredientsState) => selectedIngredientsInitialState
  }
});

export type TSelectedIngredientsActions = SliceActions<typeof selectedIngredientsSlice.actions>;
