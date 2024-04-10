import styles from './order-feed.module.scss';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSocket } from '../../hooks/use-socket';
import { IOrderItem, IOrderList } from '../../models/profile.model';
import { ProfileOrderItemComponent } from '../../components/order-item';
import { numberWithSpaces } from '../../utils/pipes';
import { setOrderIngredients } from '../../utils/set-order-ingredients';
import { useSelector } from '../../models/store.model';

export function OrderFeedPage() {
  const ingredientsMap = useSelector(store => store.ingredients.ingredientsMap);
  const { connect } = useSocket('wss://norma.nomoreparties.space/orders/all', {
    onMessage: (event: MessageEvent<string>) => {
      const ordersList = setOrderIngredients(
        ingredientsMap, JSON.parse(event.data)
      );
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    connect('');
  }, []);

  const toOrderInformationPage = (order: IOrderItem) => {
    navigate(`/order-feed/${order.number}`, {
      state: {
        page: location
      }
    });
  }

  return (
    <div className={styles.component}>
      <p className={`text text_type_main-large`}>
        Лента заказов
      </p>
      <div className={styles.wrapper}>
        <div className={styles.order}>
          <ul className={styles.order_list}>
            {orders?.orders.map(order => (
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
