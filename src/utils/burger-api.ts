import { API_URL } from './constants';
import { checkResponse } from './api-helpers';
import { IIngredient, IOrderResponse } from '../models/burger.model';

/**
 * Получаем список ингредиентов
 */
export const getIngredientsRequest = (): Promise<{ data: IIngredient[], success: boolean }> => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse<{ data: IIngredient[], success: boolean }>);
}

/**
 * Функция создает заказ
 * @param ingredients - массив с _id всех ингредиентов
 */
export const createOrderRequest = (ingredients: string[]): Promise<IOrderResponse> => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients: ingredients
    })
  })
    .then(checkResponse<IOrderResponse>)
}
