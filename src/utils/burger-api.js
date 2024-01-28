import { API_URL } from './constants';
import { checkResponse } from './api-helpers';

export const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
}
