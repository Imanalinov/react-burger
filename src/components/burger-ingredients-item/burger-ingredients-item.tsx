import styles from './burger-ingredients-item.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ingredientDraggingSlice } from '../../services/slices/ingredient-dragging';
import { IStoreState } from '../../models/store.model';
import { IIngredient } from '../../models';

interface Props {
  ingredient: IIngredient;
}

const BurgerIngredientsItem: React.FC<Props> = ({ ingredient }) => {
  const viewIngredient = useSelector<IStoreState, IIngredient | null>(store => store.viewIngredient.item);
  const actions = ingredientDraggingSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [isDragging]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleItemClick = () => {
    navigate({
      pathname: `/ingredients/${ingredient._id}`,
      search: createSearchParams({
        from: 'main_page'
      }).toString()
    });
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
    </>

  );
};

export default BurgerIngredientsItem;
