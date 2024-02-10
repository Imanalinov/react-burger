import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/burger-api';

export const ingredientsInitialState = {
  loading: true,
  error: false,
  data: []
};

export const getIngredientsAPI = createAsyncThunk(
  'INGREDIENTS/GET_ALL',
  async (thunkAPI) => {
    try {
      return await getIngredients();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'INGREDIENTS',
  initialState: ingredientsInitialState,
  reducers: {
    increaseSelectedIngredient: (state, action) => {
      const { ingredient } = action.payload;
      const arr = JSON.parse(JSON.stringify(state.data));
      const indexSelectedItem = arr.findIndex(item => item._id === ingredient._id);
      const ss = arr[indexSelectedItem];
      ss.count = ss.count ? ss.count + 1 : 1;
      return {
        ...state,
        data: arr
      };
    },
    decreaseSelectedIngredient: (state, action) => {
      const ingredient = action.payload;
      const arr = JSON.parse(JSON.stringify(state.data));
      const indexSelectedItem = arr.findIndex(item => item._id === ingredient._id);
      arr[indexSelectedItem].count -= 1;
      return {
        ...state,
        data: arr
      };
    },
    increaseBun: (state, action) => {
      const bun = action.payload.ingredient;
      const arr = JSON.parse(JSON.stringify(state.data));
      const findBun = arr.find(item => item._id === bun._id);
      findBun.count = 1;
      return {
        ...state,
        data: arr
      }
    },
    decreaseBun: (state, action) => {
      const bun = action.payload;
      const arr = JSON.parse(JSON.stringify(state.data));
      const findBun = arr.find(item => item._id === bun._id);
      findBun.count = 0;
      return {
        ...state,
        data: arr
      }
    },
    resetCount: (state) => {
      return {
        ...state,
        data: state.data.map(item => ({
          ...item,
          count: 0
        }))
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIngredientsAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload.data;
    });
    builder.addCase(getIngredientsAPI.rejected, (state) => {
      state.error = true;
      state.loading = false;
    })
  }
});
