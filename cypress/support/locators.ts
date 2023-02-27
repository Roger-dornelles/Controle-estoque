const locators = {
  MENU: {
    ADD_PRODUCT: () =>
      cy
        .get('aside ul > li')
        .then(($el) => {
          return $el;
        })
        .then(($el) => {
          cy.wrap($el[1]).click();
          cy.url().should('exist');
        }),
  },
};

export default locators;
