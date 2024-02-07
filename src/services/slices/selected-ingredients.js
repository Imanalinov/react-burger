import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash/uniqueId';

export const selectedIngredientsInitialState = {
  totalPrice: 0,
  ingredients: [],
  bun: null
};

export const selectedIngredientsSlice = createSlice({
  name: 'SELECTED_INGREDIENTS',
  initialState: selectedIngredientsInitialState,
  reducers: {
    /**
     * @param action - ingredientItem
     */
    add: (state, action) => {
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
    /**
     * @param action - index & ingredientItem
     */
    deleteIngredient: (state, action) => {
      if (state.ingredients.length === 1) {
        return {
          totalPrice: state.bun.price * 2,
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
    /**
     * @param action - ingredients[]
     */
    set: (state, action) => {
      const bun = action.payload.find(item => item.type === 'bun');
      const ingredients = action.payload;
      return {
        totalPrice: ingredients.reduce((sum, item) => item.type !== 'bun' ? sum + item.price : sum, 0) + (bun.price * 2),
        ingredients:
          ingredients
            .filter((item) => item.type !== 'bun')
            .map(item => ({
              ...item,
              uniqueId: uniqueId()
            })),
        bun: bun
      };
    },
    move: (state, action) => {
      const arr = JSON.parse(JSON.stringify(state.ingredients));

      const { dragIndex, hoverIndex } = action.payload;

      arr.splice(dragIndex, 1);
      arr.splice(hoverIndex, 0, state.ingredients[dragIndex]);

      return {
        ...state,
        ingredients: arr
      };
    }
  }
});
