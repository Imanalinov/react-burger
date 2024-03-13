import { getAccessToken } from './token';
import { API_URL } from './constants';
import { updateTokenRequest } from '../services/api/user';

export const checkResponse = <T>(res: Response): Promise<T | never> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const fetchWithRefresh = <T>(url: string, body?: Object | null, method: string = 'GET'): Promise<T> => {
  const token = getAccessToken() || '';
  return fetch(`${API_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify(body)
  })
    .then(checkResponse<T>)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.message === 'jwt expired') {
        return updateTokenRequest();
      }
      return err;
    })

}
