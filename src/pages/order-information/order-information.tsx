import React from 'react';
import { OrderInformationComponent } from '../../components/order-information';

interface Props {
  page: 'orderFeed' | 'profile';
}

export const OrderInformationPage = (props: Props) => {
  return (
    <div className="mt-5">
      <OrderInformationComponent {...props} />
    </div>
  )
};
