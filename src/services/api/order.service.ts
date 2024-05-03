import { request } from '../../utils/api-helpers';
import { IOrderItem } from '../../models/profile.model';

export function getOrder(orderId: string, useToken: boolean = false) {
  return request<{ orders: IOrderItem[], success: boolean }>(
    `orders/${orderId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
