import { IIngredient } from '../models';
import { IOrderList } from '../models/profile.model';
import uniqueId from 'lodash/uniqueId';

export function setOrderIngredients(
  ingredientsMap: Record<string, IIngredient>,
  orderList: IOrderList
) {
  if (!orderList.orders) {
    return;
  }
  orderList.orders.forEach((order) => {
    order.ingredients.forEach((orderIngredient) => {
      if (!order.fullIngredients) {
        order.fullIngredients = [];
      }
      const ingredient = JSON.parse(JSON.stringify(ingredientsMap[orderIngredient]));
      ingredient.uniqueId = uniqueId(order.number.toString());
      order.fullIngredients.push(ingredient);
      order.sum = order.sum !== undefined ? order.sum + ingredient.price : 0;
    })
  });
  return orderList;
}
