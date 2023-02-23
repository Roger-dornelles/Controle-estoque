describe('Home', () => {
  it('should navigate to the login page', () => {
    cy.visit('/');
    cy.get('section div h2').should('contain', 'Sistema de gerenciamento');
    cy.get('footer span').should('contain', 'produzido por Controls');
    cy.get('button:contains("Fazer Login")').click();
    cy.url().should('include', '/signin');
  });
});
export {};
