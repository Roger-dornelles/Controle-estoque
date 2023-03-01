const locators = {
  MENU: {
    NAVIGATION_MENU: (name: string) => {
      cy.get(`aside ul > [data-cy="${name}"]`)
        .then(($el) => {
          return $el;
        })
        .then(($el) => {
          cy.wrap($el).click();
          cy.url().should('exist');
        });
    },
  },
  CREATE_PRODUCT: (name: string, description: string, quantity: string) => {
    locators.MENU.NAVIGATION_MENU('Adicionar produto');
    cy.get('[data-cy="name"]').type(name);
    cy.get('[data-cy="description"]').type(description);
    cy.get('[data-cy="quantity"]').type(quantity);
    cy.get('button:contains("Cadastrar")').click();
    cy.contains('sucesso');
  },
  DELETE_PRODUCT: (name: string) => {
    cy.get(`section [data-cy="${name}"]`).then(($el) => {
      if ($el) {
        cy.wrap($el).should('exist');
        cy.wrap(`[data-cy="${name}"] > [data-cy="trash"]`).should('exist');
        cy.get(`[data-cy="${name}"]  [data-cy="trash"]`).click();
        cy.get(`[data-cy="${name}"] [data-test="delete"]`).should('exist');
        cy.get(`[data-cy="${name}"] [data-test="delete"]`).click();
        cy.contains('excluido com sucesso');
        cy.wrap(`[data-cy="${name}"]`).should('not.be');
      }
    });
  },
};

export default locators;
