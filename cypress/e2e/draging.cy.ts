import * as ingredientsJSON from '../fixtures/ingredients.json';
import { BurgerConstructorPom } from '../pages/burger-constructor.pom';
import { LoginPom } from '../pages/login.pom';
import * as orderJSON from '../fixtures/order.json';
import { ModalPom } from '../pages/modal.pom';
import { BASE_URL, TEST_URL } from '../support/constants';

describe('Testing dragging and create order', () => {

  const ingredients = ingredientsJSON.data;

  const pom = BurgerConstructorPom.elements;
  const loginPom = LoginPom.elements;

  beforeEach(() => {
    cy.visit(TEST_URL);

    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      statusCode: 200,
      body: ingredientsJSON
    }).as('getIngredients');
    cy.wait('@getIngredients');

    pom.ingredient(ingredients[0]).drag(pom.bunDropArea());
    pom.ingredient(ingredients[1]).drag(pom.ingredientDropArea());

    cy.clearAllLocalStorage();
  });

  it('should drag ingredients to constructor', () => {
    pom.totalPrice().should('have.text', (ingredients[0].price * 2) + ingredients[1].price);

    pom.bunText().eq(0).should('have.text', 'Краторная булка N-200i... (верх)');
    pom.bunText().eq(1).should('have.text', 'Краторная булка N-200i... (низ)');

    pom.bunPrice().eq(0).should('have.text', ingredients[0].price);
    pom.bunPrice().eq(1).should('have.text', ingredients[0].price);

    pom.ingredientText().should('have.text', ingredients[1].name);

    pom.ingredientPrice().should('have.text', ingredients[1].price);
  });


  it('should create order', () => {
    pom.createOrderButton().click();

    cy.url().should('eq', `${TEST_URL}/login`);

    loginPom.email().type('fara.imanalinov@gmail.com', { force: true });
    loginPom.password().type('123123', { force: true });
    loginPom.loginBtn().click();

    cy.intercept(
      'POST',
      `${BASE_URL}/auth/login`,
      {
        statusCode: 200,
        body: {
          "success": true,
          "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDMzZDllOTdlZGUwMDAxZDA1Y2RlYiIsImlhdCI6MTcxNTg3MjgxOSwiZXhwIjoxNzE1ODc0MDE5fQ.aJNL58cFptJomSjTPZO3cPaXy_6aCqOiG_M9xUxNODI",
          "refreshToken": "aa729e57ae9a69a783b258b26fdedb1c7b7ef07483168a6116b4819067c0db0aa4f48d5e6204c6c0",
          "user": {
            "email": "fara.imanalinov@gmail.com",
            "name": "Farkhat"
          }
        }
      }
    ).as('login');

    cy.wait('@login');

    cy.intercept(
      'POST',
      `${BASE_URL}/orders`,
      {
        statusCode: 200,
        body: orderJSON
      }
    ).as('createOrder');

    cy.wait('@createOrder');


    cy.get('[data-cy="order_details"]').should('exist');
    cy.get('[data-cy="order-id"]').should('have.text', orderJSON.order.number);
    ModalPom.elements.header().find('svg').click();
    cy.get('[data-cy="order_details"]').should('not.exist');
  });
});
