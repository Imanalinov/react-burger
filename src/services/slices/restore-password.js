import { createSlice } from '@reduxjs/toolkit';
import { forgotPasswordAPI, resetPasswordAPI } from '../actions/restore-password';

export const restorePasswordInitialState = {
  forgotPassword: {
    loading: false,
    error: false,
    response: null
  },
  resetPassword: {
    loading: false,
    error: false,
    response: null
  },
  email: '',
  password: '',
  token: ''
};

export const restorePasswordSlice = createSlice({
  name: 'RESTORE_PASSWORD',
  initialState: restorePasswordInitialState,
  reducers: {
    forgotPasswordSetValue: (state, action) => ({
      ...state,
      email: action.payload
    }),
    resetPasswordSetValue: (state, action) => ({
      ...state,
      [action.payload.field]: action.payload.value
    })
  },
  extraReducers: (builder) => {
    builder
      // ---------------------------------------------------------------------
      // FORGOT PASSWORD
      // ---------------------------------------------------------------------
      .addCase(forgotPasswordAPI.pending, (state) => ({
        ...state,
        forgotPassword: {
          loading: true,
          error: false,
          response: null
        }
      }))
      .addCase(forgotPasswordAPI.fulfilled, (state, action) => ({
        ...state,
        forgotPassword: {
          loading: false,
          error: false,
          response: action.payload
        }
      }))
      .addCase(forgotPasswordAPI.rejected, (state) => ({
        ...state,
        forgotPassword: {
          loading: false,
          error: true,
          response: null
        }
      }))
      // ---------------------------------------------------------------------
      // RESET PASSWORD
      // ---------------------------------------------------------------------
      .addCase(resetPasswordAPI.pending, (state) => ({
        ...state,
        resetPassword: {
          loading: true,
          error: false,
          response: null
        }
      }))
      .addCase(resetPasswordAPI.fulfilled, (state, action) => restorePasswordInitialState)
      .addCase(resetPasswordAPI.rejected, (state) => ({
        ...state,
        resetPassword: {
          loading: false,
          error: true,
          response: null
        }
      }));
  }
});
