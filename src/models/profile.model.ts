import { IIngredient } from './burger.model';

export interface IOrderItem {
  ingredients: string[];
  _id: string;
  status: 'done' | 'created' | 'pending' | string;
  number: number;
  /**
   * @example "2021-06-23T20:11:01.403Z"
   */
  createdAt: string;
  /**
   * @example "2021-06-23T20:11:01.406Z"
   */
  updatedAt: string;
  name?: string;

  fullIngredients?: IIngredient[];
  sum?: number;
}

export interface IOrderList {
  success: boolean;
  orders: IOrderItem[];
  total: number;
  totalToday: number;
}
