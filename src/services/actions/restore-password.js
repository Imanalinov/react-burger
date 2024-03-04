import { createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordRequest, resetPasswordRequest } from '../api/user';

/**
 * @example return {
 *   "success": true,
 *   "message": "Reset email sent"
 * }
 */
export const forgotPasswordAPI = createAsyncThunk(
  'RESTORE_PASSWORD/FORGOT',
  async (email, thunkAPI) => {
    try {
      return await forgotPasswordRequest(email);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

/**
 * @example body {
 *   "password": "",
 *   "token": ""
 * }
 *
 * @example return {
 *   "success": true,
 *   "message": "Password successfully reset"
 * }
 */
export const resetPasswordAPI = createAsyncThunk(
  'RESTORE_PASSWORD/RESET',
  async (body, thunkAPI) => {
    try {
      return await resetPasswordRequest(body);
    } catch (error) {
      return thunkAPI.abort(error.message)
      // return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)
