import { IIngredient } from '../../src/models';

export class BurgerConstructorPom {
  static elements = {
    createOrderButton: () => cy.get('[data-cy="create_order-button"]'),
    ingredientDropArea: () => '[data-cy="ingredients-drop_area"]',
    bunDropArea: () => '[data-cy="bun-drop_area-top"]',
    ingredient: (ingredient: IIngredient) => cy.get(`[data-cy="${ingredient._id}"]`),
    totalPrice: () => cy.get('[data-cy="constructor-total_price"]'),
    dropedIngredients: () => cy.get('[data-cy="constructor-ingredient"]'),
    dropedBun: () => cy.get('[data-cy="constructor-bun"]'),
    bunPrice: () => cy.get('[data-cy="constructor-bun"] > .constructor-element > .constructor-element__row > .constructor-element__price'),
    bunText: () => cy.get('[data-cy="constructor-bun"] > .constructor-element > .constructor-element__row > .constructor-element__text'),
    ingredientText: () => cy.get('[data-cy="constructor-ingredient"] > .constructor-element > .constructor-element__row > .constructor-element__text'),
    ingredientPrice: () => cy.get('[data-cy="constructor-ingredient"] > .constructor-element > .constructor-element__row > .constructor-element__price')
  };
}
