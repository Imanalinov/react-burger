import './burger-ingredients.scss';
import { useEffect, useState } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { DATA } from '../../utils/data';

const BurgerIngredientsItem = ({ item, onClick }) => {
  return (
    <div className={`ingredient--item`} onClick={() => onClick(item)}>
      {item.count && <Counter count={item.count} size="default" extraClass="m-1" />}
      <img
        src={item.image_large}
        className={`item--img pr-4 pl-4`}
        alt={item.name}
      />
      <div className={`item--price mt-1`}>
        <p className={`text text_type_digits-default`}>
          {item.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default mt-1`}>
        {item.name}
      </p>
    </div>
  );
};

const getIngredientName = (ingredient) => {
  if (ingredient === 'bun') {
    return 'Булки';
  } else if (ingredient === 'sauce') {
    return 'Соусы';
  } else {
    return 'Начинки';
  }
};

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const [data, setData] = useState({
    loading: true,
    error: false,
    ingredients: {
      bun: [],
      sauce: [],
      main: []
    }
  });

  useEffect(() => {
    setTimeout(() => {
      const bun = DATA.filter((ing) => ing.type === 'bun');
      const sauce = DATA.filter((ing) => ing.type === 'sauce');
      const main = DATA.filter((ing) => ing.type === 'main');
      setData({
        loading: false,
        error: false,
        ingredients: {
          bun,
          sauce,
          main
        }
      });
    }, 0);

  }, []);

  const onIngredientClick = (item) => {
    setData((prevState) => {
      const selectedTypeArray = [...data.ingredients[item.type]];
      const currentItemIndex = selectedTypeArray.findIndex((currentItem) => currentItem._id === item._id);
      selectedTypeArray[currentItemIndex].count = selectedTypeArray[currentItemIndex].count ? selectedTypeArray[currentItemIndex].count + 1 : 1;

      return {
        ...prevState,
        ingredients: {
          ...prevState.ingredients,
          [item.type]: selectedTypeArray
        }
      };
    });
  };

  const onTabClick = (event) => {
    setCurrentTab(event);
  };

  const getTemplate = () => {
    if (data.loading) {
      return 'Loading...';
    }
    return (
      Object.keys(data.ingredients).map((key) => (
        <div key={key}>
          <h2 className={`text text_type_main-medium`}>
            {getIngredientName(key)}
          </h2>
          <div className={`ingredient--wrapper p-4 pt-6 pb-10`}>
            {data.ingredients[key].map((item) => (
              <BurgerIngredientsItem
                key={item._id}
                item={item}
                onClick={onIngredientClick}
              />
            ))}
          </div>
        </div>
      ))
    );
  };

  return (
    <section className={`ingredient`}>
      <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
      <div className={`mt-5`} style={{ display: 'flex' }}>
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
      <div className={`mt-10 ingredient--container`}>
        {getTemplate()}
      </div>
    </section>
  );
};

export default BurgerIngredients;
