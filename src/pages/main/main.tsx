import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsAPI, IIngredientsState } from '../../services/slices/ingredients';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './main.module.scss';
import { IStoreState } from '../../models/store.model';

export const MainPage = () => {
  const ingredients = useSelector<IStoreState, IIngredientsState>(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredientsAPI());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.wrapper}>
        {ingredients.loading && 'Loading...'}
        {ingredients.error && 'Error'}
        {
          ingredients.data.length > 0 &&
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        }
      </div>
    </DndProvider>
  );
};
