import * as ingredients from '../fixtures/ingredients.json';
import { IngredientDetailsPom } from '../pages/ingredient-details.pom';
import { ModalPom } from '../pages/modal.pom';
import { BASE_URL, TEST_URL } from '../support/constants';

describe('Testing ingredient modal', () => {
  const { page, fats, name, proteins, carbohydrates, calories } = IngredientDetailsPom.elements;
  const { header } = ModalPom.elements;

  const ingredient = ingredients.data[0];
  const id = ingredient._id;

  beforeEach(() => {
    cy.visit(TEST_URL);

    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      statusCode: 200,
      body: ingredients
    }).as('getIngredients');



    cy.wait('@getIngredients');
    cy.get(`[data-cy="${id}"]`).as('bun');
    cy.get('@bun').click();
  });

  it('should url equal ingredients/id', () => {
    cy.url().should('eq', `${TEST_URL}/ingredients/${id}`);


    header().find('svg').click();

    cy.url().should('eq', `${TEST_URL}/`);
  });

  it('should modal contains all data', () => {
    // check img
    page().find('img').should('have.attr', 'src', ingredient.image_large);
    // check ingredient name
    name().should('have.text', ingredient.name);
    // check ingredient attributes
    calories().find('p').eq(1).should('have.text', ingredient.calories);
    proteins().find('p').eq(1).should('have.text', ingredient.proteins);
    fats().find('p').eq(1).should('have.text', ingredient.fat);
    carbohydrates().find('p').eq(1).should('have.text', ingredient.carbohydrates);
    // check header
    header().find('p').should('have.text', 'Детали ингредиента');
    header().find('svg').should('exist');
  });

  it('should close modal on click close button in header', () => {
    header().find('svg').click();

    cy.url().should('eq', `${TEST_URL}/`);
  });
});
