// test1.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test



describe('service is available', function() {
    it('should be available on localhost:3000', function() {
      cy.visit('http://localhost:3000');
    });
  }); 