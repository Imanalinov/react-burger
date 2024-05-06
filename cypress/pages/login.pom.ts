export class LoginPom {
  static elements = {
    email: () => cy.get('[data-cy="email-input"]'),
    password: () => cy.get('[data-cy="password-input"]'),
    loginBtn: () => cy.get('[data-cy="login-btn"]')
  }
}
