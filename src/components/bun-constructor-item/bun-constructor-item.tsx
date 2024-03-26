import styles from './bun-constructor-item.module.scss';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrop } from 'react-dnd';

import { selectedIngredientsSlice } from '../../services/slices/selected-ingredients';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { IIngredient } from '../../models';
import { useDispatch, useSelector } from '../../models/store.model';

interface Props {
  isTop: boolean;
}

export const BunConstructorItem: React.FC<Props> = ({ isTop }) => {
  const bun = useSelector(store => store.selectedIngredients.bun);
  const draggingState = useSelector(store => store.ingredientDragging);
  const { add } = selectedIngredientsSlice.actions;
  const { decreaseBun, increaseBun } = ingredientsSlice.actions;
  const dispatch = useDispatch();

  const [{ isHover }, bunDropTarget] = useDrop({
    accept: 'bun',
    drop(item: { ingredient: IIngredient }) {
      bun && dispatch(decreaseBun(bun));
      dispatch(add(item));
      dispatch(increaseBun(item));
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });


  return (
    <ul className={`${isTop ? 'mb-4' : 'mt-4'} pr-6 ${styles.ul}`}>
      <li
        className={styles.li}
        ref={bunDropTarget}
      >
        {
          bun ?
            <ConstructorElement
              type={isTop ? 'top' : 'bottom'}
              isLocked={true}
              text={`${bun.name} ${isTop ? '(верх)' : '(низ)'}`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={`
                ${draggingState.isDragging && draggingState.item?.type === 'bun' ? styles.bun_dragging : ''}
                ${isHover ? styles.hover : ''}
                ${isTop ? '' : styles.bottom}
             `}
            /> :
            <div
              className={`
              ${styles.empty_bun}
              ${draggingState.isDragging && draggingState.item?.type === 'bun' ? styles.bun_dragging : ''}
              ${isHover ? styles.hover : ''}
              ${isTop ? '' : styles.bottom}
            `}
            ></div>
        }

      </li>
    </ul>
  );
};
