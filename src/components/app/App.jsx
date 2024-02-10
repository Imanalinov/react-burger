import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsAPI } from '../../services/slices/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const ingredients = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsAPI());
  }, [dispatch]);

  return (
    <div className={`${styles.main_container} h-screen`}>
      <AppHeader />
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
    </div>
  );
}

export default App;
