import { ingredientsInitialState, ingredientsSlice } from './ingredients';
import { combineReducers } from 'redux';
import { selectedIngredientsInitialState, selectedIngredientsSlice } from './selected-ingredients';
import { viewIngredientInitialState, viewIngredientSlice } from './view-ingredient';
import { createdOrderInitialState, createdOrderSlice } from './created-order';
import { ingredientDraggingInitialState, ingredientDraggingSlice } from './ingredient-dragging';
import { userInitialState, userSlice } from './user';
import { restorePasswordInitialState, restorePasswordSlice } from './restore-password';


export const initialState = {
  ingredients: ingredientsInitialState,
  selectedIngredients: selectedIngredientsInitialState,
  viewIngredient: viewIngredientInitialState,
  createdOrder: createdOrderInitialState,
  ingredientDragging: ingredientDraggingInitialState,
  user: userInitialState,
  restorePassword: restorePasswordInitialState
};

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  selectedIngredients: selectedIngredientsSlice.reducer,
  viewIngredient: viewIngredientSlice.reducer,
  createdOrder: createdOrderSlice.reducer,
  ingredientDragging: ingredientDraggingSlice.reducer,
  user: userSlice.reducer,
  restorePassword: restorePasswordSlice.reducer
});
