import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { API_URL } from '../../utils/constants';

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    loading: true,
    error: false,
    ingredients: []
  });

  useEffect(() => {
    fetch(API_URL + 'ingredients')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBurgerIngredients({
          loading: false,
          error: false,
          ingredients: res.data
        });
      })
      .catch((err) => {
        setBurgerIngredients({
          loading: false,
          error: true,
          ingredients: []
        });
      });
  }, []);

  return (
    <div className={`${styles.main_container} h-screen`}>
      <AppHeader />
      <div className={styles.wrapper}>
        {burgerIngredients.loading && 'Loading...'}
        {burgerIngredients.error && 'Error...'}
        {
          !!burgerIngredients.ingredients.length &&
          <BurgerIngredients ingredientsList={burgerIngredients.ingredients} />
        }
        {
          !!burgerIngredients.ingredients.length &&
          <BurgerConstructor constructorIngredients={burgerIngredients.ingredients} />
        }
      </div>
    </div>
  );
}

export default App;
