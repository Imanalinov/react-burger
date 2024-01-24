import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.scss';
import { DATA } from '../../utils/data';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/ingredient-prop-type';
import { useMemo } from 'react';

const BurgerConstructor = ({ constructorIngredients }) => {
  const filteredIngredientList = useMemo(() => constructorIngredients.filter(
    (_, index) => index !== 0 && index !== constructorIngredients.length - 1), [constructorIngredients]);


  return (
    <section className={`mt-25`}>
      <ul className={`mb-4 pr-6`}>
        <li>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={constructorIngredients[0].name}
            price={constructorIngredients[0].price}
            thumbnail={constructorIngredients[0].image}
          />
        </li>
      </ul>
      <div className={styles.overflow}>
        <ul>
          {filteredIngredientList.map((ingredient) => (
            <li key={ingredient._id}>
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
        <li>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={constructorIngredients.at(-1).name}
            price={constructorIngredients.at(-1).price}
            thumbnail={constructorIngredients.at(-1).image}
          />
        </li>
      </ul>

      <div className={`mt-10 ${styles['constructor--submit']}`}>
        <span className={`mr-10`}>
          <span className={`text text_type_digits-medium`}>610</span>
          <CurrencyIcon type="primary" />
        </span>

        <Button htmlType="button" type="primary" size="large">
          <p className="text text_type_main-default">
            Оформить заказ
          </p>
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.defaultProps = {
  constructorIngredients: DATA,
}

BurgerConstructor.propTypes = {
  constructorIngredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
}

export default BurgerConstructor;
