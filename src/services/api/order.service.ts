import { API_URL } from '../../utils/constants';
import { checkResponse } from '../../utils/api-helpers';
import { IOrderItem } from '../../models/profile.model';

export function getOrder(orderId: string, useToken: boolean = false) {
  const url = `/orders/${orderId}`;
  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse<{ orders: IOrderItem[], success: boolean }>)
}
