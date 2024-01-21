import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-constructor.scss';
import { DATA } from '../../utils/data';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ ingredientList }) => {

  const getConstructionElementList = () => {
    const filteredIngredientList = ingredientList.filter(
      (_, index) => index !== 0 && index !== ingredientList.length - 1
    )
    return (
      filteredIngredientList.map((ingredient) => (
        <li key={ingredient._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </li>
      ))
    )
  }

  return (
    <section className={`mt-25`}>
      <ul>
        <li>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={ingredientList[0].name}
            price={ingredientList[0].price}
            thumbnail={ingredientList[0].image}
          />
        </li>
      </ul>
      <div className={`overflow`}>
        <ul className={`mt-4`}>
          {getConstructionElementList()}
        </ul>
      </div>
      <ul className={`mt-4`}>
        <li>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={ingredientList.last.name}
            price={ingredientList.last.price}
            thumbnail={ingredientList.last.image}
          />
        </li>
      </ul>

      <div className={`mt-10 constructor--submit`}>
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
  ingredientList: DATA,
}

BurgerConstructor.propTypes = {
  ingredientList: PropTypes.array
}

export default BurgerConstructor;
