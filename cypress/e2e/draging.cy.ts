import * as ingredientsJSON from '../fixtures/ingredients.json';
import { BurgerConstructorPom } from '../pages/burger-constructor.pom';
import { LoginPom } from '../pages/login.pom';
import * as orderJSON from '../fixtures/order.json';
import { ModalPom } from '../pages/modal.pom';

describe('Testing dragging and create order', () => {

  const ingredients = ingredientsJSON.data;

  const pom = BurgerConstructorPom.elements;
  const loginPom = LoginPom.elements;

  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
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

    cy
      .get('[data-cy="constructor-bun"] > .constructor-element > .constructor-element__row > .constructor-element__text')
      .eq(0)
      .should('have.text', 'Краторная булка N-200i... (верх)');

    cy
      .get('[data-cy="constructor-bun"] > .constructor-element > .constructor-element__row > .constructor-element__text')
      .eq(1)
      .should('have.text', 'Краторная булка N-200i... (низ)');

    cy
      .get('.mb-4 > [data-cy="constructor-bun"] > .constructor-element > .constructor-element__row > .constructor-element__price')
      .eq(0)
      .should('have.text', ingredients[0].price);

    cy
      .get('[data-cy="constructor-bun"] > .constructor-element > .constructor-element__row > .constructor-element__price')
      .eq(1)
      .should('have.text', ingredients[0].price);

    cy
      .get('[data-cy="constructor-ingredient"] > .constructor-element > .constructor-element__row > .constructor-element__text')
      .should('have.text', ingredients[1].name);

    cy
      .get('[data-cy="constructor-ingredient"] > .constructor-element > .constructor-element__row > .constructor-element__price')
      .should('have.text', ingredients[1].price);
  });


  it('should create order', () => {
    pom.createOrderButton().click();

    cy.url().should('eq', 'http://localhost:3000/login');

    loginPom.email().type('fara.imanalinov@gmail.com', { force: true });
    loginPom.password().type('123123', { force: true });
    loginPom.loginBtn().click();

    cy.intercept(
      'POST',
      'https://norma.nomoreparties.space/api/auth/login',
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
      'https://norma.nomoreparties.space/api/orders',
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
