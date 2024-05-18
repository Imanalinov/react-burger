import { ISelectedIngredientsState, selectedIngredientsSlice } from '../selected-ingredients';

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
  },
  {
    "_id": "643d69a5c3f7b9001cfa0976",
    "name": "Котлета 24Б",
    "type": "main",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 1000,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  }
];

describe('Selected Ingredients Slice', () => {
  let initialState: ISelectedIngredientsState;

  beforeEach(() => {
    initialState = {
      totalPrice: 0,
      ingredients: [],
      bun: null
    };
  });

  it('should add ingredient to selected ingredients', () => {
    expect(
      selectedIngredientsSlice.reducer(undefined, selectedIngredientsSlice.actions.add({ ingredient: ingredients[1] }))
    ).toEqual({
      totalPrice: 90,
      ingredients: [{ ...ingredients[1], uniqueId: "1" }],
      bun: null
    });
  });

  it('should add bun to selected ingredients', () => {
    expect(
      selectedIngredientsSlice.reducer(undefined, selectedIngredientsSlice.actions.add({ ingredient: ingredients[0] }))
    ).toEqual({
      totalPrice: 2510,
      ingredients: [],
      bun: ingredients[0]
    })
  });

  it('should delete ingredient from selected ingredients', () => {
    const selectedIngredient = {
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
    };

    expect(
      selectedIngredientsSlice.reducer({
        totalPrice: 90,
        ingredients: [selectedIngredient],
        bun: null
      }, selectedIngredientsSlice.actions.deleteIngredient({ index: 0, ingredient: selectedIngredient}))
    ).toEqual({
      totalPrice: 0,
      ingredients: [],
      bun: null
    });
  });

  it('should move ingredient from selected ingredients', () => {

    expect(
      selectedIngredientsSlice.reducer({
        totalPrice: 0,
        ingredients: [ingredients[1], ingredients[2]],
        bun: null
      }, selectedIngredientsSlice.actions.move({ dragIndex: 0, hoverIndex: 1 }))
    ).toEqual({
      totalPrice: 0,
      ingredients: [ingredients[2], ingredients[1]],
      bun: null
    });
  });

  it('should reset state', () => {
    expect(
      selectedIngredientsSlice.reducer({
        totalPrice: 1234,
        ingredients: [ingredients[1], ingredients[2]],
        bun: ingredients[0]
      },
      selectedIngredientsSlice.actions.reset()
    )).toEqual({
      totalPrice: 0,
      ingredients: [],
      bun: null
    });
  });
});
