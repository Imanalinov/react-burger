import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsRequest } from '../../utils/burger-api';
import { IIngredient } from '../../models';
import { SliceActions } from '../../utils/actions-type';

export interface IIngredientsState {
  loading: boolean;
  error: boolean;
  data: IIngredient[];
  ingredientsMap: Record<string, IIngredient>;
}

export const ingredientsInitialState: IIngredientsState = {
  loading: true,
  error: false,
  data: [],
  ingredientsMap: {}
};

export const getIngredientsAPI = createAsyncThunk<{ data: IIngredient[], success: boolean }>(
  'INGREDIENTS/GET_ALL',
  async (_, thunkAPI) => {
    try {
      return await getIngredientsRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'INGREDIENTS',
  initialState: ingredientsInitialState,
  reducers: {
    increaseSelectedIngredient: (state, action: PayloadAction<{ ingredient: IIngredient }>) => {
      const { ingredient } = action.payload;
      const arr: IIngredient[] = JSON.parse(JSON.stringify(state.data));
      const indexSelectedItem = arr.findIndex(item => item._id === ingredient._id);
      const ss = arr[indexSelectedItem];
      ss.count = ss.count ? ss.count + 1 : 1;
      return {
        ...state,
        data: arr
      };
    },
    decreaseSelectedIngredient: (state, action: PayloadAction<IIngredient>) => {
      const ingredient = action.payload;
      const arr: IIngredient[] = JSON.parse(JSON.stringify(state.data));
      const indexSelectedItem = arr.findIndex(item => item._id === ingredient._id);
      arr[indexSelectedItem].count! -= 1;
      return {
        ...state,
        data: arr
      };
    },
    increaseBun: (state, action: PayloadAction<{ ingredient: IIngredient }>) => {
      const bun = action.payload.ingredient;
      const arr: IIngredient[] = JSON.parse(JSON.stringify(state.data));
      const findBun = arr.find(item => item._id === bun._id);
      if (!findBun) {
        throw new Error('Нет булки!');
      }
      findBun.count = 1;
      return {
        ...state,
        data: arr
      };
    },
    decreaseBun: (state, action: PayloadAction<IIngredient>) => {
      const bun = action.payload;
      const arr: IIngredient[] = JSON.parse(JSON.stringify(state.data));
      const findBun = arr.find(item => item._id === bun._id);
      if (!findBun) {
        throw new Error('Нет булки!');
      }
      findBun.count = 0;
      return {
        ...state,
        data: arr
      };
    },
    resetCount: (state) => {
      return {
        ...state,
        data: state.data.map(item => ({
          ...item,
          count: 0
        }))
      };
    },
    set: (_, action: PayloadAction<IIngredient[]>) => {
      return {
        loading: false,
        error: false,
        data: action.payload,
        ingredientsMap: action.payload.reduce<Record<string, IIngredient>>((acc, item) => {
          acc[item._id] = item;
          return acc;
        }, {})
      };
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
      state.ingredientsMap = action.payload.data.reduce<Record<string, IIngredient>>((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {})
    });
    builder.addCase(getIngredientsAPI.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  }
});

export type TIngredientsActions = SliceActions<typeof ingredientsSlice.actions>;
