import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './bun-constructor-item.module.scss';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectedIngredientsState, selectedIngredientsSlice } from '../../services/slices/selected-ingredients';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { IStoreState } from '../../models/store.model';
import { IIngredientDraggingState } from '../../services/slices/ingredient-dragging';
import { IIngredient } from '../../models';

interface Props {
  isTop: boolean;
}

export const BunConstructorItem: React.FC<Props> = ({ isTop }) => {
  const { bun } = useSelector<IStoreState, ISelectedIngredientsState>(store => store.selectedIngredients);
  const draggingState = useSelector<IStoreState, IIngredientDraggingState>(store => store.ingredientDragging);
  const { add } = selectedIngredientsSlice.actions;
  const { decreaseBun, increaseBun } = ingredientsSlice.actions;
  const dispatch = useDispatch();

  const [{ isHover }, bunDropTarget] = useDrop({
    accept: 'bun',
    drop(item: IIngredient) {
      bun && dispatch(decreaseBun(bun));
      dispatch(add({ ingredient: item }));
      dispatch(increaseBun({ ingredient: item }));
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
