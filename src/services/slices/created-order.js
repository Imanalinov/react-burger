import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderReq } from '../../utils/burger-api';

export const createdOrderInitialState = {
  loading: false,
  error: false,
  data: null,
  modal: false,
};

export const createOrderAPI = createAsyncThunk(
  'CREATED_ORDER/API',
  async (selectedIds, thunkAPI) => {
    try {
      return await createOrderReq(selectedIds);
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
    builder.addCase(createOrderAPI.fulfilled, (state, action) => {
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
