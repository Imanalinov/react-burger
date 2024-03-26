import { IUserState } from '../services/slices/user';
import { ISelectedIngredientsState } from '../services/slices/selected-ingredients';
import { IRestorePasswordState } from '../services/slices/restore-password';
import { IIngredientsState } from '../services/slices/ingredients';
import { ICreateOrderState } from '../services/slices/created-order';
import { IIngredientDraggingState } from '../services/slices/ingredient-dragging';
import { IViewIngredientState } from '../services/slices/view-ingredient';

export interface IStoreState {
  ingredients: IIngredientsState;
  selectedIngredients: ISelectedIngredientsState;
  viewIngredient: IViewIngredientState;
  createdOrder: ICreateOrderState;
  ingredientDragging: IIngredientDraggingState;
  user: IUserState;
  restorePassword: IRestorePasswordState;
}
