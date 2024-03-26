import styles from './ingredient-details.module.scss';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../models/store.model';
import { IViewIngredientState } from '../../services/slices/view-ingredient';

const IngredientDetails = () => {
  const { item } = useSelector<IStoreState, IViewIngredientState>(store => store.viewIngredient);

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
