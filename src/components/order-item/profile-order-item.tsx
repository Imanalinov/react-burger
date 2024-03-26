import styles from './profile-order-item.module.scss';

import React, { useMemo } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { IOrderItem } from '../../models/profile.model';

interface Props {
  order: IOrderItem;
}

function getStatusName(status: 'done' | 'created' | 'pending' | string): string {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
  }
  return 'null';
}

export function ProfileOrderItemComponent({ order }: Props) {
  const orderTime = useMemo(() => {
    const now = new Date();
    const createDate = new Date(order.createdAt);

    if (now.getDate() > createDate.getDate()) {
      createDate.setDate(createDate.getDate() - (now.getDate() - createDate.getDate()));
    }
    return createDate;
  }, [order.createdAt]);

  return (
    <div className={`p-6 ${styles.wrapper}`}>

      <div className={`flex justify-between`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={orderTime} />
        </p>
      </div>

      <p className="text text_type_main-medium mt-6">
        {order.name}
      </p>
      <p className="text text_type_main-default mt-2">
        {getStatusName(order.status)}
      </p>
      <div className={`mt-6 ${styles.item__bottom}`}>
        {
          order.fullIngredients?.length &&
          <div className={styles.image_container}>
            {
              order.fullIngredients.slice(0, 6).map((ingredient, index) => (
                <div key={ingredient.uniqueId} className={styles.image_item} style={{zIndex: 100 - (index * 2)}}>
                  <img src={ingredient.image_mobile} alt="" />
                  {
                    index === 5 &&
                    <div>
                      <div className={`text text_type_digits-default`} style={{zIndex: 100 - (index * 2) + 1}}>
                        +{ order.ingredients.length - 5 }
                      </div>
                    </div>
                  }
                </div>
              ))
            }
          </div>
        }
        <div>
          <p className="text text_type_digits-medium inline mr-2">{order.sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
