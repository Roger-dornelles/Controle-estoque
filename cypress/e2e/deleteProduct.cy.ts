/// <reference types="cypress" />

import loc from '../support/locators';

describe('delete product', () => {
  const email = 'teste@teste.com';
  const password = '12345678';
  const name = 'cypress';
  const description = 'desc cypress';
  const quantity = '20';
  beforeEach(() => {
    cy.login(email, password);
  });

  it('should return navigate page delete product', () => {
    loc.MENU.NAVIGATION_MENU('Excluir produto');
    cy.get('section h2').should('contain', 'Excluir Produto');
    cy.get('section [data-test="title-description"] > p').should('contain', 'Descrição');
  });

  it('should return product not found', () => {
    loc.MENU.NAVIGATION_MENU('Excluir produto');
    // loc.DELETE_PRODUCT(name);
    cy.get(`section [data-cy="${name}"]`).should('not.be');
  });

  it('should return delete product', () => {
    // loc.DELETE_PRODUCT(name);
    loc.CREATE_PRODUCT(name, description, quantity);
    loc.MENU.NAVIGATION_MENU('Excluir produto');
    cy.get('section h2').should('exist');
    cy.get('section h2').contains('Produto');
    cy.get(`section [data-cy="${name}"]`).then(($el) => {
      if ($el) {
        cy.wrap($el[0]).should('exist');
        cy.wrap(`[data-cy="${name}"] > [data-cy="trash"]`).should('exist');
        cy.get(`section ul [data-cy="${name}"] [data-cy="trash"]`).click();
        cy.get(`[data-cy="${name}"] [data-test="delete"]`).should('exist');
        cy.get(`[data-cy="${name}"] [data-test="delete"]`).click();
        cy.contains('excluido com sucesso');
        cy.wrap(`[data-cy="${name}"]`).should('not.be');
      }
    });
  });
});

export {};
