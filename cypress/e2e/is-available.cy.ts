import * as ingredients from '../fixtures/ingredients.json';
import { IngredientDetailsPom } from '../pages/ingredient-details.pom';
import { ModalPom } from '../pages/modal.pom';
import { BASE_URL, TEST_URL } from '../support/constants';

describe('service is available', function() {
  const { page, fats, name, proteins, carbohydrates, calories } = IngredientDetailsPom.elements;
  const { header } = ModalPom.elements;

  beforeEach(() => {
    cy.visit(TEST_URL);

    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      statusCode: 200,
      body: ingredients
    }).as('getIngredients');
  });

  it('should be available on localhost:3000', function() {



  });
});
