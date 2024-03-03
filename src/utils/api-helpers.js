import { getAccessToken } from './token';
import { API_URL } from './constants';
import { updateTokenRequest } from '../services/api/user';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

export const fetchWithRefresh = (url, body = {}, method = 'GET') => {
  const token = getAccessToken();
  return fetch(`${API_URL}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body
  })
    .then(checkResponse)
    .catch((err) => {
      if (err.message === 'jwt expired') {
        return updateTokenRequest();
      }
    })
}
