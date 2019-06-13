// https://docs.cypress.io/api/introduction/api.html

describe('Build pattern flow', () => {
  it('Creates training example and submits 1', () => {
    cy.visit('/#/create-training-example/?sent_id=1');
    cy.get('.token:contains(hypothesis)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(was)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(introduced)').click()
    cy.contains('Generate pattern').click()
    cy.contains('Submit').click()
  });

  it('Creates training example and submits 2', () => {
    cy.visit('/#/create-training-example/?sent_id=3');
    cy.get('.token:contains(cell)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(death)').click()
    cy.contains('Generate pattern').click()
    cy.contains('Submit').click()
  });
});
