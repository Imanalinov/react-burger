import { API_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/api-helpers';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../../utils/token';

/**
 * @example return {
 *   "success": true,
 *   "message": "Reset email sent"
 * }
 */
export const forgotPasswordRequest = (email) => {
  return fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email
    })
  })
    .then(checkResponse)
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
export const resetPasswordRequest = (body) => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse)
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
export const createUserRequest = (body) => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse)
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
export const loginRequest = (body) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse)
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
export const updateTokenRequest = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse)
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
export const logoutRequest = () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    return fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": refreshToken,
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
      .then(() => {
        clearTokens();
      })
  }
  throw new Error('Выход из системы невозможен, так как нет refresh токена')

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
export const getUserRequest = () => {
  const token = getAccessToken();
  return fetch(`${API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    }
  })
    .then(checkResponse)
}
