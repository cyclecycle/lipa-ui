describe('Import documents', () => {
  it('Import documents', () => {
    cy.visit('/import_docs');
    cy.get('#file-path').find('input')
      .type('data/demo/documents/beverage_cognition.json')
    cy.get('#id-field').find('input')
      .type('PMID')
    cy.get('#content-fields').find('input')
      .type('TI, AB')
    cy.get('#import-button').click()
  });
});
