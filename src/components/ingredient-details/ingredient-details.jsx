import styles from './ingredient-details.module.scss';

const IngredientDetails = ({ ingredient }) => {
  return (
    <div>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={`mx-auto block`}
      />
      <p className={`mt-4 text text_type_main-medium text-center`}>
        {ingredient.name}
      </p>
      <div className={`mt-8 ${styles['ingredient--characteristic']}`}>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {ingredient.calories}
          </p>
        </div>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {ingredient.proteins}
          </p>
        </div>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Жиры, г</p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {ingredient.fat}
          </p>
        </div>
        <div>
          <p
            className={`text text_type_main-default text_color_inactive`}
          >
            Углеводы, г</p>
          <p className={`text text_type_digits-default text_color_inactive mt-2`}>
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
