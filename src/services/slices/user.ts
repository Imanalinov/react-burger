import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserAPI, getUserAPI, loginAPI, logoutAPI, updateTokenAPI } from '../actions/user';
import { IGetUser, IUpdateToken, IUser, IUserData } from '../../models';
import { SliceActions } from '../../utils/actions-type';

export interface IUserState {
  loading: boolean;
  error: boolean;
  user: IUser | null;
  refreshToken: string | null;
  accessToken: string | null;
  isLogged: boolean;
}

export const userInitialState: IUserState = {
  loading: false,
  error: false,
  user: null,
  refreshToken: null,
  accessToken: null,
  isLogged: false
};

const extraReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
  const handleRejected = (state: IUserState) => {
    state.loading = false;
    state.error = true;
  };

  const handleWithFullData = (state: IUserState, action: PayloadAction<IUserData>) => {
    state.loading = false;
    state.error = false;
    state.user = action.payload.user;
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.isLogged = true;
  }

  const setInitialState = (state: IUserState) => {
    state.loading = false;
    state.error = false;
    state.user = null;
    state.refreshToken = null;
    state.accessToken = null;
    state.isLogged = false;
  }
    // ---------------------------------------------------------------------
    // LOGIN
    // ---------------------------------------------------------------------
  builder
    .addCase(loginAPI.pending, (state: IUserState) => {
      state.loading = true;
    })
    .addCase(loginAPI.fulfilled, (state: IUserState, action: PayloadAction<IUserData>) => {
      handleWithFullData(state, action);
    })
    .addCase(loginAPI.rejected, (state) => {
      handleRejected(state)
    })
    // ---------------------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------------------
    .addCase(createUserAPI.pending, (state: IUserState) => {
      state.loading = true;
    })
    .addCase(createUserAPI.fulfilled, (state: IUserState, action: PayloadAction<IUserData>) => {
      handleWithFullData(state, action);
    })
    .addCase(createUserAPI.rejected, (state) => {
      handleRejected(state)
    })
    // ---------------------------------------------------------------------
    // UPDATE TOKEN
    // ---------------------------------------------------------------------
    .addCase(updateTokenAPI.pending, (state: IUserState) => {
      state.loading = true;
    })
    .addCase(updateTokenAPI.fulfilled, (state: IUserState, action: PayloadAction<IUpdateToken>) => {
      state.loading = false;
      state.error = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    })
    .addCase(updateTokenAPI.rejected, (state) => {
      handleRejected(state)
    })
    // ---------------------------------------------------------------------
    // GET USER
    // ---------------------------------------------------------------------
    .addCase(getUserAPI.pending, (state: IUserState) => {
      state.loading = true;
    })
    .addCase(getUserAPI.fulfilled, (state: IUserState, action: PayloadAction<IGetUser>) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      state.isLogged = true;
    })
    .addCase(getUserAPI.rejected, (state) => {
      handleRejected(state)
    })
    // ---------------------------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------------------------
    .addCase(logoutAPI.pending, (state: IUserState) => {
      state.loading = true;
    })
    .addCase(logoutAPI.fulfilled, (state: IUserState) => {
      setInitialState(state);
    })
    .addCase(logoutAPI.rejected, (state) => {
      handleRejected(state)
    });
}

export const userSlice = createSlice({
  name: 'USER',
  initialState: userInitialState,
  reducers: {},
  extraReducers: extraReducers,
});

export type TUserActions = SliceActions<typeof userSlice.actions>;
