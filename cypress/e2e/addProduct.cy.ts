/// <reference types="cypress" />
import loc from '../support/locators';

describe('addProduct', () => {
  beforeEach(() => {
    const email = 'teste@teste.com';
    const password = '12345678';
    cy.login(email, password);
  });

  it('should navigate to page addProduct', () => {
    cy.get('aside ul > li').should('contain', 'Adicionar produto');
    cy.get('aside ul > li')
      .then(($el) => {
        return $el;
      })
      .then(($el) => {
        cy.wrap($el[1]).click();
        cy.url().should('exist');
      });
  });

  it('should return product', () => {
    const name = 'cypress';
    const description = 'cypress description';
    const quantity = '20';
    loc.MENU.ADD_PRODUCT();
    cy.get('section').contains('Cadastrar');
    cy.get('section').find('input').should('exist');
    cy.get('[data-cy="name"]').type(name);
    cy.get('[data-cy="description"]').type(description);
    cy.get('[data-cy="quantity"]').type(quantity);
    cy.get('button:contains("Cadastrar")').click();
    cy.contains('sucesso');
  });

  it('should return error to add product', () => {
    loc.MENU.ADD_PRODUCT();
    cy.get('[data-cy="name"]').type('cypress');
    cy.get('[data-cy="description"]').type('desc');
    cy.get('[data-cy="quantity"]').type('A23');
    cy.get('button:contains("Cadastrar")').click();
    cy.contains('deve conter somente numeros');
  });
});
export {};
