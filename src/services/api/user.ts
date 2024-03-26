import { API_URL } from '../../utils/constants';
import { checkResponse, fetchWithRefresh } from '../../utils/api-helpers';
import { clearTokens, getRefreshToken, setAccessToken, setRefreshToken } from '../../utils/token';
import {
  ICreateUserRequest, IGetUser, ILoginRequest, IResetPasswordRequest, IResponseWithSuccess, IUpdateToken, IUserData
} from '../../models';

/**
 * @example return {
 *   "success": true,
 *   "message": "Reset email sent"
 * }
 */
export const forgotPasswordRequest = (email: string) => {
  return fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email
    })
  })
    .then(checkResponse<IResponseWithSuccess>)
}

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
export const resetPasswordRequest = (body: IResetPasswordRequest): Promise<IResponseWithSuccess> => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse<IResponseWithSuccess>)
}

/**
 * @example body {
 *   "email": "test-data@yandex.ru",
 *   "password": "password",
 *   "name": "Username"
 * }
 *
 * @example return {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   },
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 */
export const createUserRequest = (body: ICreateUserRequest): Promise<IUserData> => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse<IUserData>)
    .then((res) => {
      setRefreshToken(res.refreshToken)
      setAccessToken(res.accessToken)
      return res;
    })
}

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
export const loginRequest = (body: ILoginRequest): Promise<IUserData> => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse<IUserData>)
    .then((res) => {
      setRefreshToken(res.refreshToken)
      setAccessToken(res.accessToken)
      return res;
    })
}

/**
 * @example return {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 */
export const updateTokenRequest = (): Promise<IUpdateToken> => {
  return fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse<IUpdateToken>)
    .then((res) => {
      setRefreshToken(res.refreshToken)
      setAccessToken(res.accessToken)
      return res;
    })
}

/**
 * @example return {
 *   "success": true,
 *   "message": "Successful logout"
 * }
 */
export const logoutRequest = (): Promise<boolean> => {
  return fetchWithRefresh<IResponseWithSuccess>(
    '/auth/logout',
    {
      token: getRefreshToken()
    },
    'POST'
  )
    .then((res) => {
      clearTokens();
      return true;
    });
}

/**
 * @example return {
 *   "success": true,
 *   "user": {
 *     "email": "",
 *     "name": ""
 *   }
 * }
 */
export const getUserRequest = (): Promise<IGetUser> => {
  return fetchWithRefresh<IGetUser>('/auth/user');
}
