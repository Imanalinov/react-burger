import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../dialog/modal/modal';
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
  searchParams.get('from') === 'order_feed' ?
    <Modal
      closeAction={handleCloseIngredientModal}
      title="Детали ингредиента"
    >
      <OrderInformationComponent {...props}/>
    </Modal>
    :
    <div className={'mt-30'}>
      <OrderInformationComponent {...props} />
    </div>
  )
};
