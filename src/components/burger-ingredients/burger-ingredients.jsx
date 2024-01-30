import styles from './burger-ingredients.module.scss';
import React, { useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/ingredient-prop-type';

const BurgerIngredients = ({ ingredientsList }) => {
  const [currentTab, setCurrentTab] = useState('bun');


  const buns = useMemo(() => ingredientsList.filter((item) => item.type === 'bun'), [ingredientsList]);
  const mains = useMemo(() => ingredientsList.filter((item) => item.type === 'main'), [ingredientsList]);
  const sauces = useMemo(() => ingredientsList.filter((item) => item.type === 'sauce'), [ingredientsList]);

  const onTabClick = (event) => {
    setCurrentTab(event);
  };

  return (
    <section className={styles.ingredient}>
      <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
      <div className={`mt-5 flex`}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 ${styles['ingredient--container']}`}>
        <IngredientsCategory categoryName={'Булки'} ingredients={buns} />
        <IngredientsCategory categoryName={'Соусы'} ingredients={sauces} />
        <IngredientsCategory categoryName={'Начинки'} ingredients={mains} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientType.isRequired).isRequired
}

export default BurgerIngredients;
