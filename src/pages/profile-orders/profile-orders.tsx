import styles from './profile-orders.module.scss';

import { useEffect, useState } from 'react';

import { useSocket } from '../../hooks/use-socket';
import { getAccessToken } from '../../utils/token';
import { ProfileOrderItemComponent } from '../../components/order-item';
import { IOrderItem, IOrderList } from '../../models/profile.model';
import { useSelector } from '../../models/store.model';
import { setOrderIngredients } from '../../utils/set-order-ingredients';
import { createSearchParams, useNavigate } from 'react-router-dom';

export function ProfileOrdersPage() {
  const ingredients = useSelector(store => store.ingredients);
  const navigate = useNavigate();

  const socket = useSocket('wss://norma.nomoreparties.space/orders', {
    onMessage: ((event: MessageEvent<string>) => {
     const orders = setOrderIngredients(
       ingredients.ingredientsMap, JSON.parse(event.data)
     );

      setMyOrders(orders)
    }),
  });

  const [myOrders, setMyOrders] = useState<IOrderList>();

  useEffect(() => {
    if (!ingredients.loading) {
      socket.connect(getAccessToken().split(' ')[1])
    }
  }, [ingredients.loading])

  const toOrderInformationPage = (order: IOrderItem) => {
    navigate({
      pathname: `/profile/orders/${order.number}`,
      search: createSearchParams({
        from: 'order_feed'
      }).toString()
    });
  }

  return (
    <div>
      <div className={styles.order}>
        <ul className={styles.order_list}>
          {myOrders?.orders.map(order => (
            <li
              key={order.number}
              onClick={() => toOrderInformationPage(order)}
            >
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
