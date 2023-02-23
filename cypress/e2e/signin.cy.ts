describe('login', () => {
  const email = 'cypress@cypress.com';
  const password = '12345678';

  beforeEach(() => {
    cy.visit('/signin');
  });

  it('should return page elements login', () => {
    cy.title().should('contain', 'Gerenciador de Estoque');
    cy.get('section h2').should('contain', 'Sistema de gerenciamento');
    cy.get('[data-cy="link"]').as('links');
    cy.get('section form div').should('contain', 'Email');
    cy.get('section form div').should('contain', 'Senha');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button:contains("Login")').should('exist');
  });

  it('should return user logged', () => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button:contains("Login")').click();
    cy.contains('Usuario logado com sucesso. ');
    cy.url().should('include', '/estoque');
  });

  it('should return logged user error', () => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456789');
    cy.get('button:contains("Login")').click();
    cy.contains('Aguarde...');
    cy.contains('Email e/ou Senha incorreto.');
    cy.url().should('include', '/signin');
  });
});
export {};
