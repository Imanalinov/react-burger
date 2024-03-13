import styles from './ingredients-category.module.scss';
import React from 'react';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import { IIngredient } from '../../models';

interface Props {
  categoryName: string;
  ingredients: IIngredient[];
}

const IngredientsCategory: React.FC<Props> = ({ categoryName, ingredients }) => {
  return (
    <div>
      <h2 className={`text text_type_main-medium`}>
        {categoryName}
      </h2>
      <div className={`${styles.wrapper} p-4 pt-6 pb-10`}>
        {ingredients.map((item) => (
          <BurgerIngredientsItem
            key={item._id}
            ingredient={item}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientsCategory;
