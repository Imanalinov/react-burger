import { API_URL } from './constants';
import { checkResponse } from './api-helpers';

/**
 * Получаем список ингредиентов
 */
export const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
}

/**
 * Функция создает заказ
 * @param ingredients - массив с _id всех ингредиентов
 */
export const createOrderReq = (ingredients2) => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients: ingredients2
    })
  })
    .then(checkResponse)
}
