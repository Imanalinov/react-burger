import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import React, { useContext, useState } from 'react';
import Modal from '../../dialog/modal/modal';
import OrderDetails from '../order-details/order-details';
import { createOrderReq } from '../../utils/burger-api';
import { SelectedIngredientsContext } from '../../services/selected-ingredients-context';

const BurgerConstructor = () => {
  const {selectedIngredientsState} = useContext(SelectedIngredientsContext);
  const [orderDetails, setOrderDetails] = useState({
    loading: false,
    error: false,
    data: null
  });

  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

  const handleCloseOrderModal = () => {
    setIsOpenOrderModal(false);
  }

  const createOrder = () => {
    setOrderDetails({
      loading: true,
      error: false,
      data: null
    });
    const selectedIds = selectedIngredientsState.ingredients.map((item) => item._id);
    selectedIds.push(selectedIngredientsState.bun._id);

    createOrderReq(selectedIds)
      .then((data) => {
        setOrderDetails({
          loading: false,
          error: false,
          data: data
        });
        setIsOpenOrderModal(true);
      })
      .catch((_) => {
        setOrderDetails({
          loading: false,
          error: true,
          data: null
        });
      })
  }

  return (
    <section className={`mt-25`}>
      <ul className={`mb-4 pr-6`}>
        <li>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={selectedIngredientsState.bun.name + ' (верх)'}
            price={selectedIngredientsState.bun.price}
            thumbnail={selectedIngredientsState.bun.image}
          />
        </li>
      </ul>
      <div className={styles.overflow}>
        <ul>
          {selectedIngredientsState.ingredients.map((ingredient) => (
            <li
              key={ingredient._id}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <ul className={`mt-4 pr-6`}>
        <li>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={selectedIngredientsState.bun.name + ' (низ)'}
            price={selectedIngredientsState.bun.price}
            thumbnail={selectedIngredientsState.bun.image}
          />
        </li>
      </ul>
      {/*---PRICE AND CREATE ORDER---*/}
      <div className={`mt-10 ${styles['constructor--submit']}`}>
        <span className={`mr-10`}>
          <span className={`text text_type_digits-medium`}>
            {selectedIngredientsState.totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </span>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={createOrder}
          disabled={orderDetails.loading}
        >
          <p className="text text_type_main-default">
            Оформить заказ
          </p>
        </Button>
      </div>

      {/*---MODAL---*/}
      {
        isOpenOrderModal &&
        <Modal
          closeAction={handleCloseOrderModal}
        >
          <OrderDetails orderId={orderDetails.data.order.number} />
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;
