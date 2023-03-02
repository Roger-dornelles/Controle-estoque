///<reference types="cypress"/>

describe('profile', () => {
  beforeEach(() => {
    let email = 'cypress@cypress.com';
    let password = '12345678';

    cy.login(email, password);
  });

  it('should return navigate profile', () => {
    cy.get('aside footer [data-cy="profile"] a').click();
    cy.get('aside footer [data-cy="profile"]').should('exist');
    cy.get('section div > span').should('have.text', 'Editar Perfil');
    cy.get('section form > label').should('contain', 'Nome:');
    cy.get('section form > div').should('contain', 'a');
    cy.get('section form > div button').should('exist');
    cy.get('section form > div a').should('have.text', 'Cancelar');
    cy.get('section form > div button').should('have.text', 'Salvar');
  });

  it.only('should return update name', () => {
    cy.get('aside footer [data-cy="profile"] a').click();
    cy.url().should('exist');
    cy.get('section form [data-test="open-name"]').should('exist');
    cy.get('section form [data-test="open-name"]').click();
    cy.get('section form label [data-cy="clear-name"]').should('exist');

    cy.wrap('section form [data-cy="name"]').then(($value) => {
      console.log($value);
    });
    cy.get('section form label [data-cy="clear-name"]').click();

    cy.get('section form [data-cy="name"]')

      .then(($value) => {
        return $value[0];
      })
      .then(($el) => {
        let initialValue = $el[0]._wrapperState.initialValue;
        let newName = 'Teste';
        if (initialValue === newName) {
          cy.get('section form [data-cy="name"]').type('Cypress');
        }
        cy.get('section form [data-cy="name"]').type(newName);
      });
    cy.get('section form div > button').click();
    cy.contains('Dados atualizados...');
  });
});

export {};
