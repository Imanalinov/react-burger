import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.scss';
import { ingredientType } from '../../utils/ingredient-prop-type';
import Modal from '../../dialog/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import React, { useState } from 'react';

const BurgerIngredientsItem = ({ ingredient }) => {
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);

  const handleCloseIngredientModal = () => {
    setIsOpenIngredientModal(false);
  }

  const handleItemClick = () => {
    setIsOpenIngredientModal(true);
  }

  return (
    <>
      <div className={styles.ingredient} onClick={handleItemClick}>
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

      {
        isOpenIngredientModal &&
        <Modal
          closeAction={handleCloseIngredientModal}
          title="Детали ингредиента"
        >
          <IngredientDetails
            ingredient={ingredient}
          />
        </Modal>
      }
    </>

  );
};

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientType.isRequired
}

export default BurgerIngredientsItem;
