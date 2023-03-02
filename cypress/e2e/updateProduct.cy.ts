/// <reference types="cypress"/>
import locator from '../support/locators';
describe('update product', () => {
  const name = 'cypress';
  const description = 'cypress description';
  const quantity = '20';

  beforeEach(() => {
    const email = 'teste@teste.com';
    const password = '12345678';
    cy.login(email, password);
    locator.CREATE_PRODUCT(name, description, quantity);
    locator.MENU.NAVIGATION_MENU('Atualizar produto');
  });

  afterEach(() => {
    locator.MENU.NAVIGATION_MENU('Excluir produto');
    locator.DELETE_PRODUCT(name);
  });

  it('should returned search product', () => {
    cy.get(`section [data-cy="title"] p`).should('contain', 'O que deseja fazer?');
    cy.get(`section [data-test="product-list"] span`).should('exist');
    cy.get('[data-test="product-list"] span').should('contain', name);
  });

  it('should return confirmation update quantity product', () => {
    cy.get('section [data-test="product-list"]').contains(name);
    cy.get(`[data-test="product-list"] [data-test="${name}"]`).should('exist');
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).should('exist');
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).should('have.text', 'Adicionar');
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).click({ force: true });
    cy.get('section [data-cy="form"] > label', { timeout: 1.5 }).contains('Adicionar ao estoque:');
    cy.get('section [data-cy="form"] > label input', { timeout: 1.5 }).type('15');
    cy.get('[data-cy="form"] button:contains("Salvar")').click();
    cy.contains('Produto atualizado');
  });

  it('should return confirmation removed quantity product', () => {
    cy.get('section [data-test="product-list"]').contains(name);
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).should('exist');
    cy.get(`[data-test="product-list"] [data-test="${name}"]`).should('exist');
    cy.get(`[data-test="product-list"] [data-test="${name}"]`).should('have.text', 'Remover');
    cy.get(`[data-test="product-list"] [data-test="${name}"]`).click({ force: true });
    cy.get('section [data-cy="form"] > label', { timeout: 1.5 }).contains('Remover do estoque:');
    cy.get('section [data-cy="form"] > label input', { timeout: 1.5 }).type('15');
    cy.get('[data-cy="form"] button:contains("Salvar")').click();
    cy.contains('Produto atualizado');
  });

  it.only('should return confirmation description altered product', () => {
    cy.get('section [data-test="product-list"]').contains(name);
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).should('exist');
    cy.get(`[data-test="product-list"] [data-test="${name}"]`).should('exist');
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).should('have.text', 'Adicionar');
    cy.get(`[data-test="product-list"] [data-cy="${name}"]`).click({ force: true });
    cy.get('section [data-cy="form"] > label', { timeout: 1.5 }).contains('Adicionar ao estoque:');
    cy.get('section [data-cy="form"] [data-test="description"] [data-cy="open-description"]', { timeout: 1.5 }).click();
    cy.get('section [data-cy="form"] [data-test="description"] > p').should('contain', 'Descrição');
    cy.get('section [data-cy="form"] [data-test="description"] input').type(' descrição nova');
    cy.get('section [data-cy="form"] > label input', { timeout: 1.5 }).type('15');
    cy.get('[data-cy="form"] button:contains("Salvar")').click();
    cy.contains('Produto atualizado');
  });
});

export {};
