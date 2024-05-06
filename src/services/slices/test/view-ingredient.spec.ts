import { IViewIngredientState, viewIngredientSlice } from '../view-ingredient';

const ing = {
  '_id': '643d69a5c3f7b9001cfa093c',
  'name': 'Краторная булка N-200i',
  'type': 'bun',
  'proteins': 80,
  'fat': 24,
  'carbohydrates': 53,
  'calories': 420,
  'price': 1255,
  'image': 'https://code.s3.yandex.net/react/code/bun-02.png',
  'image_mobile': 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  'image_large': 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  '__v': 0
};

describe('View Ingredient Slice', () => {
  const reducer = viewIngredientSlice.reducer;
  const { open, close } = viewIngredientSlice.actions;
  let state: IViewIngredientState;

  beforeEach(() => {
    state = {
      item: null
    };
  });

  it('should return initial state', () => {
    expect(viewIngredientSlice.getInitialState())
      .toEqual(state);
  });

  it('should set ingredient to view ingredient slice', () => {
    state.item = ing;

    expect
    (
      reducer(undefined, open(ing))
    )
      .toEqual(state);
  });

  it('should unset ingredient from view ingredient slice', () => {
    expect
    (
      reducer({ item: ing }, close())
    ).toEqual(state)
  });
});
