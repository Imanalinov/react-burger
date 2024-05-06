import { initialState, rootReducer } from '../index';
import { configureStore } from '@reduxjs/toolkit';
import { createdOrderSlice, createOrderAPI } from '../created-order';
import { IOrderResponse } from '../../../models';

const order: IOrderResponse = {
  'success': true,
  'name': 'Space флюоресцентный бургер',
  'order': {
    'ingredients': [
      {
        '_id': '643d69a5c3f7b9001cfa0943',
        'name': 'Соус фирменный Space Sauce',
        'type': 'sauce',
        'proteins': 50,
        'fat': 22,
        'carbohydrates': 11,
        'calories': 14,
        'price': 80,
        'image': 'https://code.s3.yandex.net/react/code/sauce-04.png',
        'image_mobile': 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        'image_large': 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        '__v': 0
      },
      {
        '_id': '643d69a5c3f7b9001cfa093d',
        'name': 'Флюоресцентная булка R2-D3',
        'type': 'bun',
        'proteins': 44,
        'fat': 26,
        'carbohydrates': 85,
        'calories': 643,
        'price': 988,
        'image': 'https://code.s3.yandex.net/react/code/bun-01.png',
        'image_mobile': 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        'image_large': 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        '__v': 0
      }
    ],
    '_id': '663dc69897ede0001d069f35',
    'owner': {
      'name': 'Farkhat',
      'email': 'fara.imanalinov@gmail.com',
      'createdAt': '2024-02-19T11:38:06.058Z',
      'updatedAt': '2024-02-21T17:36:12.074Z'
    },
    'status': 'done',
    'name': 'Space флюоресцентный бургер',
    'createdAt': '2024-05-10T07:02:48.338Z',
    'updatedAt': '2024-05-10T07:02:48.846Z',
    'number': 39641,
    'price': 1068
  }
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: true,
  preloadedState: initialState
});

describe('Created Order slice', () => {

  it('Should return the initial state', () => {
    expect(store.getState().createdOrder).toEqual({
      loading: false,
      error: false,
      data: null,
      modal: false
    });
  });

  it('Should create order and turn modal to true', () => {
    expect(createdOrderSlice.reducer(undefined, createOrderAPI.fulfilled(order, '', []))).toEqual({
      loading: false,
      error: false,
      data: order,
      modal: true
    });
  });

  it('Should return error on created order request', () => {
    expect(createdOrderSlice.reducer(undefined, createOrderAPI.rejected(null, '', []))).toEqual({
      loading: false,
      error: true,
      data: null,
      modal: false
    });
  });

  it('Should set loading on pending request', () => {
    expect(createdOrderSlice.reducer(undefined, createOrderAPI.pending('', []))).toEqual({
      loading: true,
      error: false,
      data: null,
      modal: false
    });
  });
});
