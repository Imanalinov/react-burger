import styles from './selected-ingredient.module.scss';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { selectedIngredientsSlice } from '../../services/slices/selected-ingredients';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { IIngredient } from '../../models';

interface Props {
  ingredient: IIngredient;
  index: number;
}

export const SelectedIngredient: React.FC<Props> = ({ ingredient, index }) => {
  const { decreaseSelectedIngredient } = ingredientsSlice.actions;
  const ref = useRef<HTMLDivElement | null>(null);
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
    drop(item: IIngredient) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = ingredient.index;

      if (dragIndex === hoverIndex || !dragIndex || !hoverIndex) {
        return;
      }

      dispatch(move({ dragIndex, hoverIndex }));
    }
  });

  const deleteHandler = () => {
    dispatch(deleteIngredient({ index, ingredient }));
    dispatch(decreaseSelectedIngredient(ingredient));
  };

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
