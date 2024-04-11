import { getAccessToken } from './token';
import { updateTokenRequest } from '../services/api/user';


export const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(res);
};

export const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
};

export const fetchWithRefresh = <T>(url: string, body?: Object | null, method: string = 'GET'): Promise<T> => {
  const token = getAccessToken() || '';
  return request<T>(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify(body)
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        return updateTokenRequest();
      }
      return Promise.reject<any>(err);
    })
}
