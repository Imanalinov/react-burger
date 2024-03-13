import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../models';

export interface IViewIngredientState {
  item: IIngredient | null;
}

export const viewIngredientInitialState: IViewIngredientState = {
  item: null
};

const open: CaseReducer<IViewIngredientState, PayloadAction<IIngredient>> = (state, action) => ({ item: action.payload });
const close: CaseReducer<IViewIngredientState> = () => ({ item: null });

export const viewIngredientSlice = createSlice({
  name: 'CURRENT_VIEWED_INGREDIENT',
  initialState: viewIngredientInitialState,
  reducers: {
    open,
    close
  }
});
