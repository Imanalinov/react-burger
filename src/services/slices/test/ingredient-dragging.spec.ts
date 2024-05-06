import { initialState, rootReducer } from '../index';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientDraggingSlice } from '../ingredient-dragging';
import { IIngredient } from '../../../models';

const ingredient: IIngredient = {
  "_id": "643d69a5c3f7b9001cfa093c",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: true,
  preloadedState: initialState
});

describe('Ingredient Dragging slice', () => {

  it('Should return the initial state', () => {
    expect(store.getState().ingredientDragging).toEqual({
      item: null,
      isDragging: false
    });
  });

  it('should drag ingredient', () => {
    expect(ingredientDraggingSlice.reducer(
      {
        item: null,
        isDragging: false
      },
      ingredientDraggingSlice.actions.drag(ingredient)
    )).toEqual({
      item: ingredient,
      isDragging: true
    })
  });

  it('should return the initial state on drop action', () => {
    expect(ingredientDraggingSlice.reducer(
      {
        item: { name: 'asdasd' } as any,
        isDragging: true
      },
      ingredientDraggingSlice.actions.drop()
    )).toEqual({
      item: null,
      isDragging: false
    });
  });
});
