import { useNavigate, useSearchParams } from 'react-router-dom';
import React from 'react';
import { OrderInformationComponent } from '../../components/order-information';

interface Props {
  page: 'orderFeed' | 'profile';
}

export const OrderInformationPage = (props: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCloseIngredientModal = () => {
    if (props.page === 'orderFeed') {
      navigate('/order-feed');
    } else {
      navigate('/profile/order');
    }

  }

  return (
    <div className="mt-5">
      <OrderInformationComponent {...props} />
    </div>
  )
};
