import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.scss';
import { ingredientType } from '../../utils/ingredient-prop-type';

const BurgerIngredientsItem = ({ ingredient }) => {
  return (
    <div className={styles.ingredient}>
      {ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
      <img
        src={ingredient.image}
        className={`${styles['ingredient--image']} pr-4 pl-4`}
        alt={ingredient.name}
      />
      <div className={`${styles['ingredient--price']} mt-1`}>
        <p className={`text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default mt-1`}>
        {ingredient.name}
      </p>
    </div>
  );
};

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientType.isRequired
}

export default BurgerIngredientsItem;
