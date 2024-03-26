import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrderRequest } from '../../utils/burger-api';
import { IOrderResponse } from '../../models';
import { SliceActions } from '../../utils/actions-type';

export interface ICreateOrderState {
  loading: boolean;
  error: boolean;
  data: IOrderResponse | null;
  modal: boolean;
}

export const createdOrderInitialState: ICreateOrderState = {
  loading: false,
  error: false,
  data: null,
  modal: false,
};

export const createOrderAPI = createAsyncThunk<IOrderResponse, string[]>(
  'CREATED_ORDER/API',
  async (selectedIds, thunkAPI) => {
    try {
      return await createOrderRequest(selectedIds);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message});
    }
  }
)

export const createdOrderSlice = createSlice({
  name: 'CREATED_ORDER',
  initialState: createdOrderInitialState,
  reducers: {
    closeModal: (state) => ({
      ...state,
      modal: false,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrderAPI.fulfilled, (state, action: PayloadAction<IOrderResponse>) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
      state.modal = true;
    });
    builder.addCase(createOrderAPI.rejected, (state) => {
      state.error = true;
      state.loading = false;
    })
  }
});

export type TCreateOrderActions = SliceActions<typeof createdOrderSlice.actions>;
