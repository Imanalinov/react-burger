import { fetchWithRefresh, request } from '../../utils/api-helpers';
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
  return request<IResponseWithSuccess>(
    'password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    }
  );
};

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
  return request<IResponseWithSuccess>('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

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
  return request<IUserData>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((res) => {
      setRefreshToken(res.refreshToken);
      setAccessToken(res.accessToken);
      return res;
    });
};

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
  return request<IUserData>('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((res) => {
      setRefreshToken(res.refreshToken);
      setAccessToken(res.accessToken);
      return res;
    });
};

/**
 * @example return {
 *   "success": true,
 *   "accessToken": "Bearer ...",
 *   "refreshToken": ""
 * }
 */
export const updateTokenRequest = (): Promise<IUpdateToken> => {
  return request<IUpdateToken>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => {
      setRefreshToken(res.refreshToken);
      setAccessToken(res.accessToken);
      return res;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

/**
 * @example return {
 *   "success": true,
 *   "message": "Successful logout"
 * }
 */
export const logoutRequest = (): Promise<boolean> => {
  return fetchWithRefresh<IResponseWithSuccess>(
    'auth/logout',
    {
      token: getRefreshToken()
    },
    'POST'
  )
    .then((res) => {
      clearTokens();
      return true;
    });
};

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
  return fetchWithRefresh<IGetUser>('auth/user');
};
