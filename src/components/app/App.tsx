import React, { useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DATA } from '../../utils/data';

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    loading: true,
    error: false,
    ingredients: DATA,
  });

  return (
    <div className={`${styles.main_container} h-screen`}>
      <AppHeader />
      <div className={styles.wrapper}>
        <BurgerIngredients ingredientsList={burgerIngredients.ingredients} />
        <BurgerConstructor constructorIngredients={burgerIngredients.ingredients} />
      </div>
    </div>
  );
}

export default App;
