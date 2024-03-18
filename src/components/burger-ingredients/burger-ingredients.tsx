import styles from './burger-ingredients.module.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useSelector } from 'react-redux';
import { IIngredient } from '../../models';
import { IStoreState } from '../../models/store.model';
import { IIngredientsState } from '../../services/slices/ingredients';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const ingredients = useSelector<IStoreState, IIngredientsState>(store => store.ingredients);
  const ref = useRef<HTMLDivElement>(null);

  const buns = useMemo(() => ingredients.data.filter((item: IIngredient) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.data.filter((item: IIngredient) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.data.filter((item: IIngredient) => item.type === 'sauce'), [ingredients]);

  const onTabClick = (event: string) => {
    setCurrentTab(event);
    let el;

    if (event === 'bun') {
      el = 0;
    } else if (event === 'sauce') {
      el = (ref.current!.childNodes[0] as HTMLElement).offsetTop - 20;
    } else {
      el = (ref.current!.childNodes[1] as HTMLElement).offsetTop + (ref.current!.childNodes[0] as HTMLElement).offsetTop - 80;
    }

    ref.current!.scrollTo({
      behavior: "smooth",
      left: 0,
      top: el
    });

  };

  useEffect(() => {
    const scrollHandler = (event: any) => {
      const scrollTop = event.srcElement.scrollTop;
      const childHeight1 = event.srcElement.childNodes[0].clientHeight;
      const childHeight2 = event.srcElement.childNodes[1].clientHeight;

      if (childHeight1 - 40 > scrollTop) {
        setCurrentTab('bun')
      } else if (
        childHeight1 - 40 < scrollTop &&
        childHeight2 + childHeight1 - 40 > scrollTop
      ) {
        setCurrentTab('sauce')
      } else {
        setCurrentTab('main')
      }
    }

    const element = ref.current;

    element!.addEventListener('scroll', scrollHandler);
    return () => {
      element!.removeEventListener('scroll', scrollHandler);
    }
  }, []);

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
      <div className={`mt-10 ${styles['ingredient--container']}`} ref={ref}>
        <IngredientsCategory categoryName={'Булки'} ingredients={buns} />
        <IngredientsCategory categoryName={'Соусы'} ingredients={sauces} />
        <IngredientsCategory categoryName={'Начинки'} ingredients={mains} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
