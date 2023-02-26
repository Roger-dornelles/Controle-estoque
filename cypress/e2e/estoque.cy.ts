/// <reference types="cypress" />

describe('estoque', () => {
  before(() => {
    const email = 'teste@teste.com';
    const password = '12345678';
    cy.login(email, password);
  });

  it('should return the stock page elements', () => {
    cy.get('section').should('exist');
    cy.get('section a').should('exist');
    cy.get('section [data-cy="title"] p').should('contain', 'Item');
    cy.get('section ul [data-cy="linkID"]')
      .then(($el) => {
        return $el[0];
      })
      .then(($el) => {
        cy.wrap($el).should('contain', 'Mais detalhes');
        cy.wrap($el).click();
        cy.url().should('exist');
        cy.get('section h3').should('contain', 'Mais detalhes');
        cy.get('section div > p').contains('Produto');
        cy.get('section').contains('a');
      });
  });
});
export {};
