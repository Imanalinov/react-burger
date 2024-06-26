import styles from './burger-constructor.module.scss';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import Modal from '../../dialog/modal/modal';
import OrderDetails from '../order-details/order-details';
import { createdOrderSlice, createOrderAPI } from '../../services/slices/created-order';
import { selectedIngredientsSlice } from '../../services/slices/selected-ingredients';
import { BunConstructorItem } from '../bun-constructor-item/bun-constructor-item';
import { SelectedIngredient } from '../selected-ingredient/selected-ingredient';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { IIngredient } from '../../models';
import { useDispatch, useSelector } from '../../models/store.model';
import { useLocation, useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const selectedIngredients = useSelector(store => store.selectedIngredients);
  const createdOrder = useSelector(store => store.createdOrder);
  const draggingState = useSelector(store => store.ingredientDragging);
  const isLoggedIn = useSelector(store => store.user.isLogged)
  const { increaseSelectedIngredient, resetCount } = ingredientsSlice.actions;
  const { add, reset } = selectedIngredientsSlice.actions;
  const { closeModal } = createdOrderSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.createOrder) {
      createOrderHandler();
    }
  }, []);

  const [{ isOver }, dropRef] = useDrop({
    accept: ['main', 'sauce'],
    drop(item: { ingredient: IIngredient }) {
      dispatch(add(item));
      dispatch(increaseSelectedIngredient(item));
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }, [dispatch]);

  const handleCloseOrderModal = () => {
    dispatch(reset());
    dispatch(resetCount());
    dispatch(closeModal());
  };

  const createOrderHandler = () => {
    if (!isLoggedIn) {
      navigate(
        '/login', {
          state: {
            prevPage: '/',
            createOrder: true,
          }
        }
      );
      return;
    }
    if (!selectedIngredients.bun) {
      return;
    }
    const selectedIds = selectedIngredients.ingredients.map((item) => item._id);
    selectedIds.push(selectedIngredients.bun._id);

    dispatch(createOrderAPI(selectedIds));
  };

  return (
    <section className={`mt-25 grow`}>
      <BunConstructorItem isTop={true} />

      <div
        className={`
          ${styles.overflow}
          ${draggingState.isDragging && draggingState.item?.type !== 'bun' ? styles.is_dragging : ''}
          ${isOver ? styles.over : ''}
        `}
        ref={dropRef}>
        <ul className={styles.ul}>
          {selectedIngredients.ingredients.map((ingredient, index) => (
            ingredient &&
            <li
              className={"w-full"}
              key={ingredient.uniqueId}
            >
              <SelectedIngredient ingredient={({ ...ingredient, index })} index={index} />
            </li>
          ))}
        </ul>
      </div>

      <BunConstructorItem isTop={false} />

      {/*---PRICE AND CREATE ORDER---*/}
      <div className={`mt-10 ${styles['constructor--submit']}`}>
        <span className={`mr-10`}>
          <span className={`text text_type_digits-medium`}>
            {selectedIngredients.totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </span>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={createOrderHandler}
          disabled={createdOrder.loading}
        >
          <p className="text text_type_main-default">
            Оформить заказ
          </p>
        </Button>
      </div>

      {/*---MODAL---*/}
      {
        createdOrder.modal &&
        <Modal
          closeAction={handleCloseOrderModal}
        >
          <OrderDetails orderId={createdOrder.data!.order.number} />
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;
