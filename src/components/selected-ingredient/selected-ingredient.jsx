import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { selectedIngredientsSlice } from '../../services/slices/selected-ingredients';

import styles from './selected-ingredient.module.scss';

export const SelectedIngredient = ({ ingredient, index }) => {
  const ref = useRef(null);

  const { move, deleteIngredient } = selectedIngredientsSlice.actions;
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: ingredient.type + '_move',
    item: { ingredient, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ['main_move', 'sauce_move'],
    drop(item) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = ingredient.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(move({ dragIndex, hoverIndex }));
    },
  });

  const deleteHandler = () => {
    dispatch(deleteIngredient({ index, ingredient }))
  }

  drag(drop(ref));

  return (
    <div ref={ref} className={`${styles.div} ${isDragging ? styles['ingredient-dragging'] : ''}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteHandler}
      />
    </div>
  );
};
