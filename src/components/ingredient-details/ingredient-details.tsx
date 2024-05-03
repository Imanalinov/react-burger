import styles from './ingredient-details.module.scss';

import { useSelector } from '../../models/store.model';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IIngredient } from '../../models';

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredientsMap = useSelector(store => store.ingredients.ingredientsMap);
  const [item, setItem] = useState<IIngredient | null>(null);

  useEffect(() => {
    const ing = ingredientsMap[id!];
    if (ing) {
      setItem(ing);
    }
  }, [ingredientsMap]);

  return (
    item &&
    <div>
      <img
        src={item.image_large}
        alt={item.name}
        className={`mx-auto block`}
      />
      <p className={`mt-4 text text_type_main-medium text-center`}>
        {item.name}
      </p>
      <div className={`mt-8 ${styles['ingredient--characteristic']}`}>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {item.calories}
          </p>
        </div>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {item.proteins}
          </p>
        </div>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Жиры, г</p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {item.fat}
          </p>
        </div>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Углеводы, г</p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {item.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
