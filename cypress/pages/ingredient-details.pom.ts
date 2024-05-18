export class IngredientDetailsPom {
  static elements = {
    page: () => cy.get('[data-cy="ingredient-details"]'),
    name: () => cy.get('[data-cy="ingredient-name"]'),
    calories: () => cy.get('[data-cy="ingredient-calories"]'),
    proteins: () => cy.get('[data-cy="ingredient-proteins"]'),
    fats: () => cy.get('[data-cy="ingredient-fats"]'),
    carbohydrates: () => cy.get('[data-cy="ingredient-carbohydrates"]'),

  };
}
