import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api';
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsSlice } from '../../services/slices/ingredients';
import { selectedIngredientsSlice } from '../../services/slices/selected-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const ingredients = useSelector(store => store.ingredients);
  const { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed } = ingredientsSlice.actions;
  const { set } = selectedIngredientsSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsRequest());
    getIngredients()
      .then((res) => {
        dispatch(getIngredientsSuccess(res.data));
        // dispatch(set(res.data));
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
      });
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
