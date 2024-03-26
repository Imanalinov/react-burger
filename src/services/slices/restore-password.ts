import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgotPasswordAPI, resetPasswordAPI } from '../actions/restore-password';
import { IResponseWithSuccess } from '../../models';
import { SliceActions } from '../../utils/actions-type';

interface IPasswordStateUtil {
  loading: boolean;
  error: boolean;
  response: IResponseWithSuccess | null;
}

export interface IRestorePasswordState {
  forgotPassword: IPasswordStateUtil;
  resetPassword: IPasswordStateUtil;
  email: string;
  password: string;
  token: string;
}

export const restorePasswordInitialState: IRestorePasswordState = {
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
    forgotPasswordSetValue: (state, action: PayloadAction<string>) => ({
      ...state,
      email: action.payload
    }),
    resetPasswordSetValue: (state, action: PayloadAction<{ field: string, value: string }>) => ({
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
      .addCase(forgotPasswordAPI.fulfilled, (state, action: PayloadAction<IResponseWithSuccess>) => ({
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
      .addCase(resetPasswordAPI.fulfilled, (_, __) => restorePasswordInitialState)
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

export type TRestorePasswordActions = SliceActions<typeof restorePasswordSlice.actions>;
