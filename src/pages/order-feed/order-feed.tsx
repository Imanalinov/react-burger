import styles from './order-feed.module.scss';

import { useSocket } from '../../hooks/use-socket';
import { useEffect, useState } from 'react';
import { IOrderList } from '../../models/profile.model';
import { ProfileOrderItemComponent } from '../../components/order-item';
import { numberWithSpaces } from '../../utils/pipes';

export function OrderFeedPage() {
  const { connect } = useSocket('wss://norma.nomoreparties.space/orders/all', {
    onMessage: (event: MessageEvent<string>) => {
      console.log('---------------------------------------------------------------------');
      console.log(JSON.parse(event.data));
      console.log('---------------------------------------------------------------------');

      const ordersList: IOrderList = JSON.parse(event.data);
      setOrders(ordersList);
      setDoneOrders([]);
      setWorkOrders([]);

      ordersList?.orders.forEach((order) => {
        switch (order.status) {
          case 'done':
            setDoneOrders((prev) => {
              if (prev.length >= 15) {
                return prev;
              }
              return [...prev, order.number];
            });
            break;
          case 'created':
            setWorkOrders((prev) => {
              if (prev.length >= 15) {
                return prev;
              }
              return [...prev, order.number];
            });
            break;
          case 'pending':
            setWorkOrders((prev) => {
              if (prev.length >= 15) {
                return prev;
              }
              return [...prev, order.number];
            });
            break;
        }
      });
    }
  });
  const [orders, setOrders] = useState<IOrderList>();
  const [doneOrders, setDoneOrders] = useState<number[]>([]);
  const [workOrders, setWorkOrders] = useState<number[]>([]);

  useEffect(() => {
    connect('');
  }, []);

  return (
    <div className={styles.component}>
      <p className={`text text_type_main-large`}>
        Лента заказов
      </p>
      <div className={styles.wrapper}>
        <div className={styles.order}>
          <ul className={styles.order_list}>
            {orders?.orders.map(order => (
              <li key={order.number}>
                <ProfileOrderItemComponent
                  order={order}
                />
              </li>
            ))}

          </ul>
        </div>
        <div className={styles.desk}>
          <div className={styles.desk__table}>
            <div>
              <div className={`text text_type_main-medium`}>Готовы:</div>
              <div className={styles.desk__grid}>
                {doneOrders.map((num) => (
                  <p
                    className={`text text_type_digits-default ${styles.aqua}`}
                    key={num}
                  >
                    {num}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <div className={`text text_type_main-medium`}>В работе:</div>
              <div className={styles.desk__grid}>
                {workOrders.map((num) => (
                  <p
                    className="text text_type_digits-default"
                    key={num}
                  >
                    {num}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={`mt-15`}>
            <p className={`text text_type_main-medium`}>
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">
              {numberWithSpaces(orders?.total)}
            </p>
          </div>
          <div className={`mt-15`}>
            <p className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">
              {numberWithSpaces(orders?.totalToday)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
