import styles from './profile-orders.module.scss';

import { useEffect, useState } from 'react';

import { useSocket } from '../../hooks/use-socket';
import { getAccessToken } from '../../utils/token';
import { ProfileOrderItemComponent } from '../../components/order-item';
import { IOrderList } from '../../models/profile.model';
import { useSelector } from '../../models/store.model';
import uniqueId from 'lodash/uniqueId';

export function ProfileOrdersPage() {
  const ingredients = useSelector(store => store.ingredients);

  const socket = useSocket('wss://norma.nomoreparties.space/orders', {
    onMessage: ((event: MessageEvent<string>) => {
      const orders: IOrderList = JSON.parse(event.data);

      orders.orders.forEach((order) => {
        order.ingredients.forEach((orderIngredient) => {
          if (!order.fullIngredients) {
            order.fullIngredients = [];
          }
          const ingredient = JSON.parse(JSON.stringify(ingredients.ingredientsMap[orderIngredient]));
          ingredient.uniqueId = uniqueId(order.number.toString());
          order.fullIngredients.push(ingredient);
          order.sum = order.sum !== undefined ? order.sum + ingredient.price : 0;
        })
      });

      setMyOrders(orders)
    }),
  });

  const [myOrders, setMyOrders] = useState<IOrderList>();

  useEffect(() => {
    if (!ingredients.loading) {
      socket.connect(getAccessToken().split(' ')[1])
    }
  }, [ingredients.loading])

  return (
    <div>
      <div className={styles.order}>
        <ul className={styles.order_list}>
          {myOrders?.orders.map(order => (
            <li key={order.number}>
              <ProfileOrderItemComponent
                order={order}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
