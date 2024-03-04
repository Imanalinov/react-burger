import { createSlice } from '@reduxjs/toolkit';
import { createUserAPI, getUserAPI, loginAPI, logoutAPI, updateTokenAPI } from '../actions/user';

export const userInitialState = {
  loading: false,
  error: false,
  user: null,
  refreshToken: null,
  accessToken: null,
  isLogged: false
};


export const userSlice = createSlice({
  name: 'USER',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---------------------------------------------------------------------
    // LOGIN
    // ---------------------------------------------------------------------
    builder.addCase(loginAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogged = true;
    });
    builder.addCase(loginAPI.rejected, (state) => {
      // state = { ...userInitialState, error: true };
      return { ...userInitialState, error: true };
    });
    // ---------------------------------------------------------------------
    // CREATE USER
    // ---------------------------------------------------------------------
    builder.addCase(createUserAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogged = true;
    });
    builder.addCase(createUserAPI.rejected, (state) => {
      // state = { ...userInitialState, error: true };
      return { ...userInitialState, error: true };
    });
    // ---------------------------------------------------------------------
    // UPDATE TOKEN
    // ---------------------------------------------------------------------
    builder.addCase(updateTokenAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTokenAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(updateTokenAPI.rejected, (state) => {
      // state = { ...userInitialState, error: true };
      return { ...userInitialState, error: true };
    });
    // ---------------------------------------------------------------------
    // GET USER
    // ---------------------------------------------------------------------
    builder.addCase(getUserAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      state.isLogged = true;
    });
    builder.addCase(getUserAPI.rejected, (state) => {
      // state = { ...userInitialState, error: true };
      return { ...userInitialState, error: true };
    });
    // ---------------------------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------------------------
    builder.addCase(logoutAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAPI.fulfilled, (state) => ({ ...userInitialState }));
    builder.addCase(logoutAPI.rejected, (state) => {
      return { ...userInitialState, error: true };
    });
  }
});
