import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.scss';
import { ingredientType } from '../../utils/ingredient-prop-type';
import Modal from '../../dialog/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewIngredientSlice } from '../../services/slices/view-ingredient';
import { useDrag } from 'react-dnd';
import { ingredientDraggingSlice } from '../../services/slices/ingredient-dragging';

const BurgerIngredientsItem = ({ ingredient }) => {
  const viewIngredient = useSelector(store => store.viewIngredient);
  const { open, close } = viewIngredientSlice.actions;
  const actions = ingredientDraggingSlice.actions;
  const dispatch = useDispatch();

  const [{ isDragging, canDrop }, dragRef] = useDrag({
    type: ingredient.type,
    item: { ingredient },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      canDrop: monitor.canDrag()
    })
  });

  useEffect(() => {
    if (isDragging && viewIngredient?.isDragging !== true) {
      dispatch(actions.drag(ingredient));
    }
    if (!isDragging && canDrop) {
      dispatch(actions.drop());
    }
  }, [isDragging]);

  const handleCloseIngredientModal = () => {
    dispatch(close());
  };

  const handleItemClick = () => {
    dispatch(open(ingredient));
  };

  return (
    <>
      <div
        className={styles.ingredient}
        onClick={handleItemClick}
        ref={dragRef}
      >
        {ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
        <img
          src={ingredient.image}
          className={`${styles['ingredient--image']} pr-4 pl-4`}
          alt={ingredient.name}
        />
        <div className={`${styles['ingredient--price']} mt-1`}>
          <p className={`text text_type_digits-default`}>
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default mt-1`}>
          {ingredient.name}
        </p>
      </div>

      {
        !!viewIngredient &&
        <Modal
          closeAction={handleCloseIngredientModal}
          title="Детали ингредиента"
        >
          <IngredientDetails />
        </Modal>
      }
    </>

  );
};

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientType.isRequired
};

export default BurgerIngredientsItem;
