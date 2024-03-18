import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import React from 'react';
import Modal from '../../dialog/modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { createdOrderSlice, createOrderAPI, ICreateOrderState } from '../../services/slices/created-order';
import { ISelectedIngredientsState, selectedIngredientsSlice } from '../../services/slices/selected-ingredients';
import { BunConstructorItem } from '../bun-constructor-item/bun-constructor-item';
import { SelectedIngredient } from '../selected-ingredient/selected-ingredient';
import { useDrop } from 'react-dnd';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { IIngredient } from '../../models';
import { IStoreState } from '../../models/store.model';
import { IIngredientDraggingState } from '../../services/slices/ingredient-dragging';

const BurgerConstructor = () => {
  const { increaseSelectedIngredient, resetCount } = ingredientsSlice.actions;
  const selectedIngredients = useSelector<IStoreState, ISelectedIngredientsState>(store => store.selectedIngredients);
  const { add, reset } = selectedIngredientsSlice.actions;
  const createdOrder = useSelector<IStoreState, ICreateOrderState>(store => store.createdOrder);
  const { closeModal } = createdOrderSlice.actions;
  const draggingState = useSelector<IStoreState, IIngredientDraggingState>(store => store.ingredientDragging);
  const dispatch = useDispatch();

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
    if (!selectedIngredients.bun) {
      return;
    }
    const selectedIds = selectedIngredients.ingredients.map((item) => item._id);
    selectedIds.push(selectedIngredients.bun._id);

    // @ts-ignore
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
            ingredient && <li
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
