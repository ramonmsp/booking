describe('homepage', () => {
  it('should check homepage elements', () => {
    const BASE_URL = 'http://localhost:3000';
    cy.visit(BASE_URL);
    cy.get('h1').contains('Welcome to Booking App').should('be.visible');
    cy.get('h4').contains('Booking App').should('be.visible');

    cy.get('span').contains('Places').should('be.visible');
    cy.get('span').contains('Bookings').should('be.visible');
  });
});
