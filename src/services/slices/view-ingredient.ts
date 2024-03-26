import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../models';
import { SliceActions } from '../../utils/actions-type';

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

export type TViewIngredientActions = SliceActions<typeof viewIngredientSlice.actions>;
