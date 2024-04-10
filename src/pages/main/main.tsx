import styles from './main.module.scss';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useSelector } from '../../models/store.model';
import { Outlet } from 'react-router-dom';

export const MainPage = () => {
  const ingredients = useSelector(store => store.ingredients);

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
      <Outlet />
    </DndProvider>
  );
};
