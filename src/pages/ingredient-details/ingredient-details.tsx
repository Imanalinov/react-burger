import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { getIngredientsAPI } from '../../services/slices/ingredients';
import { viewIngredientSlice } from '../../services/slices/view-ingredient';
import Modal from '../../dialog/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from '../../models/store.model';

export const IngredientDetailsPage: React.FC = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const ingredientStore = useSelector(store => store.ingredients);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewIngredient = useSelector(store => store.viewIngredient);
  const viewIngredientActions = viewIngredientSlice.actions;


  useEffect(() => {
    if (!ingredientStore.data.length) {
      getIngredients();
    }
  }, [id]);

  useEffect(() => {
    const ing = ingredientStore.data?.find((ingredient) => ingredient._id === id);
    if (ing) {
      dispatch(viewIngredientActions.open(ing));
    }
  }, [ingredientStore.data]);

  const getIngredients = () => {
    dispatch(getIngredientsAPI());
  };

  const handleCloseIngredientModal = () => {
    dispatch(viewIngredientActions.close());
    navigate('/');
  };

  if (ingredientStore.loading || !viewIngredient) {
    return <div>Loading...</div>;
  }

  if (ingredientStore.error) {
    return <div>Error</div>;
  }

  return (
    searchParams.get('from') === 'main_page' ?
      <Modal
        closeAction={handleCloseIngredientModal}
        title="Детали ингредиента"
      >
        <IngredientDetails />
      </Modal>
      :
      <div className={'mt-30'}>
        <IngredientDetails />
      </div>

  );
};
