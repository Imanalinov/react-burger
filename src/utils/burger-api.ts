import { request } from './api-helpers';
import { IIngredient, IOrderResponse } from '../models';
import { getAccessToken } from './token';

/**
 * Получаем список ингредиентов
 */
export const getIngredientsRequest = (): Promise<{ data: IIngredient[], success: boolean }> => {
  return request<{ data: IIngredient[], success: boolean }>('ingredients')
}

/**
 * Функция создает заказ
 * @param ingredients - массив с _id всех ингредиентов
 */
export const createOrderRequest = (ingredients: string[]): Promise<IOrderResponse> => {
  const token = getAccessToken() || '';
  return request<IOrderResponse>('orders', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
    body: JSON.stringify({
      ingredients: ingredients
    })
  })
}
