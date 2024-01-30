import React, { useEffect, useReducer, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api';
import { SelectedIngredientsContext } from '../../services/selected-ingredients-context';

/**
 * Функция reducer для контекста выбранных булок
 */
function selectedIngredientsReducer(state, action) {
  switch (action.type) {
    case 'add':
      if (action.ingredient.type === 'bun') {
        return {
          totalPrice: state.totalPrice - ((state.bun?.price || 0) * 2) + (action.ingredient.price * 2),
          ingredients: state.ingredients,
          bun: action.ingredient
        };
      }
      const selectedIngredients = state.ingredients;
      selectedIngredients.splice(action.index, 0, action.ingredient);

      return {
        totalPrice: state.totalPrice + action.ingredient.price,
        ingredients: selectedIngredients,
        bun: state.bun
      };
    case 'deleteIngredient':
      const arr = state.ingredients;
      arr.splice(action.index, 1);

      return {
        totalPrice: state.totalPrice - action.ingredient,
        ingredients: arr,
        bun: state.bun
      };
    case 'deleteBun':
      return {
        totalPrice: state.totalPrice - ((state.bun?.price || 0) * 2),
        ingredients: state.ingredients,
        bun: null
      };
    case 'set':
      const bun = action.ingredient.find(item => item.type === 'bun');
      return {
        totalPrice: action.ingredient.reduce((sum, item) => item.type !== 'bun' ? sum + item.price : sum, 0) + (bun.price * 2),
        ingredients: action.ingredient.filter((item) => item.type !== 'bun'),
        bun: bun
      };
    default:
      throw new Error(`Был передан неправильный тип действия: ${action.type}`);
  }
}

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    loading: true,
    error: false,
    ingredients: []
  });

  const [selectedIngredientsState, selectedIngredientsDispatch] = useReducer(
    selectedIngredientsReducer,
    {
      totalPrice: 0,
      ingredients: [],
      bun: null,
    },
    undefined
  );


  useEffect(() => {
    getIngredients()
      .then((res) => {
        setBurgerIngredients({
          loading: false,
          error: false,
          ingredients: res.data
        });
        selectedIngredientsDispatch({type: 'set', ingredient: res.data})
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
      <SelectedIngredientsContext.Provider value={{ selectedIngredientsState, selectedIngredientsDispatch }}>
        <div className={styles.wrapper}>
          {burgerIngredients.loading && 'Loading...'}
          {burgerIngredients.error && 'Error...'}
          {
            !!burgerIngredients.ingredients.length &&
            <>
              <BurgerIngredients ingredientsList={burgerIngredients.ingredients} />
              <BurgerConstructor />
            </>
          }
        </div>
      </SelectedIngredientsContext.Provider>
    </div>
  );
}

export default App;
