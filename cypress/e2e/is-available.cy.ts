import * as ingredients from '../fixtures/ingredients.json';
import { IngredientDetailsPom } from '../pages/ingredient-details.pom';
import { ModalPom } from '../pages/modal.pom';

describe('service is available', function() {
  const { page, fats, name, proteins, carbohydrates, calories } = IngredientDetailsPom.elements;
  const { header } = ModalPom.elements;

  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      statusCode: 200,
      body: ingredients
    }).as('getIngredients');
  });

  it('should be available on localhost:3000', function() {



  });
});
