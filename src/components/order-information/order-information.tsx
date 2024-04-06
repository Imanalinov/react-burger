import styles from './order-information.module.scss';
import { redirect, useParams } from 'react-router-dom';
import { useSelector } from '../../models/store.model';
import React, { useEffect, useMemo, useState } from 'react';
import { IOrderItem } from '../../models/profile.model';
import { IIngredient } from '../../models';
import { getOrder } from '../../services/api/order.service';
import { getStatusName } from '../order-item';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
  page: 'orderFeed' | 'profile';
}

export const OrderInformationComponent = (props: Props) => {
  const { id } = useParams();

  const ingredientsMap = useSelector(store => store.ingredients.ingredientsMap);
  const [order, setOrder] = useState<IOrderItem | null>(null);
  const [selectedIngredientsMap, setSelectedIngredientsMap] = useState<Record<string, IIngredient> | null>(null);

  const orderTime = useMemo(() => {
    if (!order) {
      return new Date();
    }
    const now = new Date();
    const createDate = new Date(order.createdAt);

    if (now.getDate() > createDate.getDate()) {
      createDate.setDate(createDate.getDate() - (now.getDate() - createDate.getDate()));
    }
    return createDate;
  }, [order?.createdAt]);

  useEffect(() => {
    if (!id) {
      if (props.page === 'orderFeed') {
        redirect('/order-feed')
      } else {
        redirect('/profile/order')
      }
    }
    if (Object.keys(ingredientsMap).length) {
      getOrder(id!, false).then((res) => {
        const map: Record<string, IIngredient> = {};
        let sum = 0;
        res.orders[0].ingredients.forEach((id) => {
          if (map[id]) {
            map[id].count! += 1;
          } else {
            map[id] = structuredClone(ingredientsMap[id]);
            map[id].count = 1;
          }
          sum += map[id].price;
        });
        res.orders[0].sum = sum;
        setSelectedIngredientsMap(map);
        setOrder(res.orders[0]);
      })
    }
  }, [id, ingredientsMap]);

  return (
    order && selectedIngredientsMap &&
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className="text text_type_digits-default">
          #{order.number}
        </p>
        <p className={`text text_type_main-medium mt-10 w-full ${styles.name}`}>
          {order.name}
        </p>
        <p className="text text_type_main-default mt-3 w-full">
          {getStatusName(order.status)}
        </p>
        <p className="text text_type_main-medium mt-15 w-full">
          Состав:
        </p>
        <div>
          <ul className={styles.list}>
            {
              Object.keys(selectedIngredientsMap || {}).map((id) => {
                const ing = selectedIngredientsMap[id];
                return (
                  <li
                    className={styles.list_item}
                    key={id}
                  >
                    <div className={styles.img_container}>
                      <img src={ing.image_mobile} alt="" />
                    </div>
                    <p className="text text_type_main-medium grow">
                      {ing.name}
                    </p>
                    <p className="text text_type_digits-default">
                      <div className="flex items-center">
                        <span className="mr-2">{ing.count} x {ing.price}</span>
                        <CurrencyIcon type="primary"/>
                      </div>
                    </p>

                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="flex justify-between items-center w-full mt-10">
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={orderTime} />
          </p>
          <div className="flex items-center">
            <p className="text text_type_digits-default mr-2">{order.sum}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>
  )
};
