import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/ingredient-prop-type';

import styles from './ingredients-category.module.scss';

const IngredientsCategory = ({ categoryName, ingredients }) => {
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

IngredientsCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
}

export default IngredientsCategory;
