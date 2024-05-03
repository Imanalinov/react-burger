import { createUserRequest, getUserRequest, loginRequest, logoutRequest, updateTokenRequest } from '../api/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateUserRequest, IGetUser, ILoginRequest, IUpdateToken, IUserData } from '../../models';

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
export const loginAPI = createAsyncThunk<IUserData, ILoginRequest>(
  'USER/LOGIN',
  loginRequest
);

export const createUserAPI = createAsyncThunk<IUserData, ICreateUserRequest>(
  'USER/REGISTER',
  createUserRequest
);

/**
 * @example return {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 */
export const updateTokenAPI = createAsyncThunk<IUpdateToken, void>(
  'USER/UPDATE_TOKEN',
  updateTokenRequest
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
export const getUserAPI = createAsyncThunk<IGetUser>(
  'USER/GET_USER',
  getUserRequest
);

/**
 * @example return {
 *   "success": true,
 *   "message": "Successful logout"
 * }
 */
export const logoutAPI = createAsyncThunk<boolean>(
  'USER/LOGOUT',
  logoutRequest
);

