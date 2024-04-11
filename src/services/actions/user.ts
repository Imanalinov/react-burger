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
  async (body: ILoginRequest, thunkAPI) => await loginRequest(body)
);

export const createUserAPI = createAsyncThunk<IUserData, ICreateUserRequest>(
  'USER/REGISTER',
  async (body: ICreateUserRequest, thunkAPI) => await createUserRequest(body)
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
  async (arg, thunkAPI) => await updateTokenRequest()
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
  async (_, thunkAPI) => await getUserRequest() as IGetUser
);

/**
 * @example return {
 *   "success": true,
 *   "message": "Successful logout"
 * }
 */
export const logoutAPI = createAsyncThunk<boolean>(
  'USER/LOGOUT',
  async (_, thunkAPI) => await logoutRequest()
);

