// https://docs.cypress.io/api/introduction/api.html

const checkPatternBuildResults = () => {
  cy.wait(1500)
  cy.get('#pattern-api-message-log')
    .then(messageLog => {
      expect(messageLog).to.have.contain('Build pattern request received')
      expect(messageLog).to.have.contain('Build pattern success')
      expect(messageLog).to.have.contain('Find matches request received')
      expect(messageLog).to.have.contain('Find matches success')
      expect(messageLog).to.not.contain('Something went wrong')
      cy.get('p').find(':contains(Finding matches)').should('have.length', 1)
    })
}

describe('Build pattern flow', () => {
  it('Creates training example and submits 1', () => {
    cy.visit('/#/create-training-example/?sent_id=2');
    cy.get('.token:contains(hypothesis)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(was)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(introduced)').click()
    cy.contains('Generate pattern').click()
    cy.contains('Submit').click()

    checkPatternBuildResults()
  });

  it('Creates training example and submits 2', () => {
    cy.visit('/#/create-training-example/?sent_id=4');
    cy.get('.token:contains(cell)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(death)').click()
    cy.contains('Generate pattern').click()
    cy.contains('Submit').click()

    checkPatternBuildResults()
  });

  it('Creates training example and submits 2', () => {
    cy.visit('/#/create-training-example/?sent_id=13');
    cy.get('.token:contains(successful)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(disease)').click()
    cy.contains('Generate pattern').click()
    cy.contains('Submit').click()

    checkPatternBuildResults()
  });

  it('Creates training example and submits 2', () => {
    cy.visit('/#/create-training-example/?sent_id=12');
    cy.get('.token:contains(amyloid)').click()
    cy.get('.add-slot-button').click()
    cy.get('.token:contains(plaques)').click()
    cy.contains('Generate pattern').click()
    cy.contains('Submit').click()

    checkPatternBuildResults()
  });
});
