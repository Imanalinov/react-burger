import { ingredientsSlice } from '../ingredients';
import { initialState, rootReducer } from '../index';
import { IIngredient } from '../../../models';
import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const ingredients = [
  {
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
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  }
];

const emptryIngredients: IIngredient[] = [];

describe('Ingredients slice', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  // const enhancer = applyMiddleware(thunk);
  // const store = createStore(rootReducer, enhancer);

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    }),
    devTools: true,
    preloadedState: initialState
  });

  const store2 = configureMockStore();

  const { set, increaseBun, decreaseBun, decreaseSelectedIngredient, increaseSelectedIngredient, resetCount} = ingredientsSlice.actions;

  it('should initial state for ingredients', () => {
    expect(store.getState().ingredients).toEqual({
      loading: true,
      error: false,
      data: [],
      ingredientsMap: {}
    });
  })

  it('should set ingredients', () => {
    store.dispatch(set(ingredients));
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: ingredients,
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': {
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
        },
        '643d69a5c3f7b9001cfa0942': {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0
        }
      }
    });
  });

  it('should set empty ingredients', () => {
    store.dispatch(set(emptryIngredients));
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: [],
      ingredientsMap: {}
    })
  });

  it('should reset count to 0', () => {
    store.dispatch(set(ingredients));
    store.dispatch(resetCount());
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: [
        {
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
          "__v": 0,
          "count": 0,
        },
        {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
          "count": 0,
        }
      ],
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': {
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
          "__v": 0,
        },
        '643d69a5c3f7b9001cfa0942': {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
        }
      }
    })
  });

  it('should increase counter selected ingredient', () => {
    store.dispatch(set(ingredients));
    store.dispatch(increaseSelectedIngredient({ ingredient: ingredients[1]}));
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: [
        {
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
        },
        {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
          "count": 1,
        }
      ],
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': {
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
          "__v": 0,
        },
        '643d69a5c3f7b9001cfa0942': {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
        }
      }
    })
  });

  it('should decrease counter selected ingredient', () => {
    store.dispatch(set(ingredients));
    store.dispatch(increaseSelectedIngredient({ ingredient: ingredients[1] }));
    store.dispatch(decreaseSelectedIngredient(ingredients[1]));
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: [
        {
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
          "__v": 0,
        },
        {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
          "count": 0,
        }
      ],
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': {
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
          "__v": 0,
        },
        '643d69a5c3f7b9001cfa0942': {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
        }
      }
    })
  });

  it('should increase bun\'s counter', () => {
    store.dispatch(set(ingredients));
    store.dispatch(increaseBun({ ingredient: ingredients[0] }));
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: [
        {
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
          "__v": 0,
          "count": 1,
        },
        {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0
        }
      ],
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': {
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
          "__v": 0,
        },
        '643d69a5c3f7b9001cfa0942': {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
        }
      }
    })
  });

  it('should decrease bun\'s counter', () => {
    store.dispatch(set(ingredients));
    store.dispatch(increaseBun({ ingredient: ingredients[0] }));
    store.dispatch(decreaseBun(ingredients[0]));
    expect(store.getState().ingredients).toEqual({
      loading: false,
      error: false,
      data: [
        {
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
          "__v": 0,
          "count": 0,
        },
        {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0
        }
      ],
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': {
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
          "__v": 0,
        },
        '643d69a5c3f7b9001cfa0942': {
          "_id": "643d69a5c3f7b9001cfa0942",
          "name": "Соус Spicy-X",
          "type": "sauce",
          "proteins": 30,
          "fat": 20,
          "carbohydrates": 40,
          "calories": 30,
          "price": 90,
          "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
          "__v": 0,
        }
      }
    })
  });

  it('should test', () => {
    fetchMock.getOnce('/ingredients', {
      headers: { 'content-type': 'application/json' },
      body: ingredients
    });

    const expectedAction = [
      { type: 'INGREDIENTS/GET_ALL/pending' },
      {
        type: 'INGREDIENTS/GET_ALL/fulfilled',
        payload: {
          "success": true,
          "data": ingredients
        }
      },
    ];



    // return store.dispatch(getIngredientsAPI()).then(() => {
    //   expect(store).toEqual(ingredientsSlice.actions);
    // });

  });
})

export {};
