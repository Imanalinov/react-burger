import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { viewIngredientSlice } from '../../services/slices/view-ingredient';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from '../../models/store.model';

export const IngredientDetailsPage: React.FC = (): React.ReactElement => {
  const { id } = useParams();

  const ingredientStore = useSelector(store => store.ingredients);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewIngredient = useSelector(store => store.viewIngredient);
  const viewIngredientActions = viewIngredientSlice.actions;

  useEffect(() => {
    const ing = ingredientStore.data?.find((ingredient) => ingredient._id === id);
    if (ing) {
      dispatch(viewIngredientActions.open(ing));
    }
  }, [ingredientStore.data]);

  const handleCloseIngredientModal = () => {
    dispatch(viewIngredientActions.close());
    navigate(-1);
  };

  if (ingredientStore.loading || !viewIngredient) {
    return <div>Loading...</div>;
  }

  if (ingredientStore.error) {
    return <div>Error</div>;
  }

  return (
    <div className={'mt-30'}>
      <IngredientDetails />
    </div>
  );
};
