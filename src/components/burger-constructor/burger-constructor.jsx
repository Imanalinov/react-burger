import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import { DATA } from '../../utils/data';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/ingredient-prop-type';
import React, { useMemo, useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { createPortal } from 'react-dom';
import Modal from '../../dialog/modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = ({ constructorIngredients }) => {
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

  const { bun, ingredients } = useMemo(() => {
    return {
      bun: constructorIngredients.find(item => item.type === 'bun'),
      ingredients: constructorIngredients.filter(item => item.type !== 'bun'),
    };
  }, [constructorIngredients]);

  const modalContainer = document.getElementById('modals_container');

  const onConstructorItemClick = (item) => {
    setSelectedIngredient(item);
    setIsOpenIngredientModal(true);
  };

  const handleCloseModal = (isOrderModal) => {
    if (isOrderModal) {
      setIsOpenOrderModal(false);
    } else {
      setIsOpenIngredientModal(false);
    }
  }

  const createOrder = () => {
    setIsOpenOrderModal(true);
  }

  return (
    <section className={`mt-25`}>
      <ul className={`mb-4 pr-6`}>
        <li onClick={() => onConstructorItemClick(bun)}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className={styles.overflow}>
        <ul>
          {ingredients.map((ingredient) => (
            <li
              onClick={() => onConstructorItemClick(ingredient)}
              key={ingredient._id}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <ul className={`mt-4 pr-6`}>
        <li onClick={() => onConstructorItemClick(bun)}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>

      <div className={`mt-10 ${styles['constructor--submit']}`}>
        <span className={`mr-10`}>
          <span className={`text text_type_digits-medium`}>610</span>
          <CurrencyIcon type="primary" />
        </span>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={createOrder}
        >
          <p className="text text_type_main-default">
            Оформить заказ
          </p>
        </Button>
      </div>

      {
        isOpenIngredientModal &&
        createPortal(
          <Modal
            closeAction={() => handleCloseModal(false)}
            title="Детали ингредиента"
          >
            <IngredientDetails
              ingredient={selectedIngredient}
            />
          </Modal>,
          modalContainer
        )
      }

      {
        isOpenOrderModal &&
        createPortal(
          <Modal
            closeAction={() => handleCloseModal(true)}
          >
            <OrderDetails />
          </Modal>,
          modalContainer
        )
      }

      

    </section>
  );
};

BurgerConstructor.defaultProps = {
  constructorIngredients: DATA
};

BurgerConstructor.propTypes = {
  constructorIngredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export default BurgerConstructor;
