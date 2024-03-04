import { createUserRequest, getUserRequest, loginRequest, logoutRequest, updateTokenRequest } from '../api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * @example body {
 *   "email": "",
 *   "password": ""
 * }
 *
 * @example return {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": "",
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   }
 * }
 */
export const loginAPI = createAsyncThunk(
  'USER/LOGIN',
  async (body, thunkAPI) => {
    try {
      return await loginRequest(body);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createUserAPI = createAsyncThunk(
  'USER/REGISTER',
  async (body, thunkAPI) => {
    try {
      return await createUserRequest(body);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/**
 * @example return {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 */
export const updateTokenAPI = createAsyncThunk(
  'USER/UPDATE_TOKEN',
  async (arg, thunkAPI) => {
    try {
      return await updateTokenRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/**
 * @example return {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   }
 * }
 */
export const getUserAPI = createAsyncThunk(
  'USER/GET_USER',
  async (arg, thunkAPI) => {
    try {
      return await getUserRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

/**
 * @example return {
 *   "success": true,
 *   "message": "Successful logout"
 * }
 */
export const logoutAPI = createAsyncThunk(
  'USER/LOGOUT',
  async (arg, thunkAPI) => {
    try {
      return await logoutRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

