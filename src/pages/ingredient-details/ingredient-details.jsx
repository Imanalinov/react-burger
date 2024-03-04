import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsAPI } from '../../services/slices/ingredients';
import React, { useEffect } from 'react';
import { viewIngredientSlice } from '../../services/slices/view-ingredient';
import Modal from '../../dialog/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

export const IngredientDetailsPage = () => {
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
    if (ingredientStore.data.length) {
      dispatch(viewIngredientActions.open(ingredientStore.data.find((ingredient) => ingredient._id === id)));
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
    return 'Loading...';
  }

  if (ingredientStore.error) {
    return 'Error';
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
