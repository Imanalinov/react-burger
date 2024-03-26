import { ingredientsInitialState, ingredientsSlice, TIngredientsActions } from './ingredients';
import { combineReducers } from 'redux';
import {
  selectedIngredientsInitialState, selectedIngredientsSlice, TSelectedIngredientsActions
} from './selected-ingredients';
import { TViewIngredientActions, viewIngredientInitialState, viewIngredientSlice } from './view-ingredient';
import { createdOrderInitialState, createdOrderSlice, TCreateOrderActions } from './created-order';
import {
  ingredientDraggingInitialState, ingredientDraggingSlice, TIngredientDraggingActions
} from './ingredient-dragging';
import { TUserActions, userInitialState, userSlice } from './user';
import { restorePasswordInitialState, restorePasswordSlice, TRestorePasswordActions } from './restore-password';

export type TRootActions =
  TCreateOrderActions |
  TIngredientDraggingActions |
  TIngredientsActions |
  TRestorePasswordActions |
  TSelectedIngredientsActions |
  TUserActions |
  TViewIngredientActions;


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
