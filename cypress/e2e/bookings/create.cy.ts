import { deleteAllBookings } from "./requests/delete_bookings";

describe('create booking flow', () => {
  const BASE_URL = 'http://localhost:3000';
  it('should not have data', () => {
    cy.visit(`${BASE_URL}`);
    cy.contains('Bookings').click();
    cy.contains('Bookings').click();
    cy.url().should('include', '/bookings');

    cy.get('h1').contains('My Bookings').should('be.visible');
    cy.get('div').contains('No data').should('be.visible');
  });

  it('should create a booking to Salvador', () => {
    deleteAllBookings(BASE_URL);

    cy.visit(`${BASE_URL}`);
    cy.contains('Places').click();
    cy.contains('Places').click();
    cy.contains('Book this place').click();

    cy.get('.ant-picker-range').click();
    cy.get('.ant-picker-panel-container').within(() => {
      cy.get('[title="2024-04-16"]').click();
      cy.get('[title="2024-04-20"]').click();
    });
    cy.contains('Create booking').click();

    cy.url().should('include', '/bookings');
    cy.get('.ant-table-row').contains('Salvador').should('be.visible');
  });

  it('should not booking when dates are overlapped', () => {
    cy.visit(`${BASE_URL}`);
    cy.contains('Places').click();
    cy.contains('Places').click();
    cy.contains('Book this place').click();

    cy.get('.ant-picker-range').click();
    cy.get('.ant-picker-panel-container').within(() => {
      cy.get('[title="2024-04-16"]').click();
      cy.get('[title="2024-04-20"]').click();
    });
    cy.contains('div', 'Place is not available in these dates').should('be.visible');
  });
});
