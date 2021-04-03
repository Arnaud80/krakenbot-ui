describe('First App tests', () => {
    it('Open the App and check the component ticker', () => {
      cy.visit('http://localhost:3000');
  
      cy.get('[data-testid="ticker"]')
        .click();
      
      /*cy.get('[data-testid="sendButton"]')
        .click();
  
      cy.get('[data-testid="messageText"]')
        .should('have.value', '');
  
      cy.contains('New message');*/
    });
  });