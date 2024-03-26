import styles from './main.module.scss';

import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getIngredientsAPI } from '../../services/slices/ingredients';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from '../../models/store.model';

export const MainPage = () => {
  const ingredients = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
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
