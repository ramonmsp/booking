import { createBooking } from './requests/create_booking';
import { deleteAllBookings } from './requests/delete_bookings';

describe('delete booking flow', () => {
  const BASE_URL = 'http://localhost:3000';
  it('should delete a booking', () => {
    deleteAllBookings(BASE_URL);
    createBooking(BASE_URL);

    cy.visit(`${BASE_URL}`);
    cy.contains('Bookings').click();
    cy.contains('Bookings').click();
    cy.url().should('include', '/bookings');

    cy.get('.ant-table-row').contains('August 16, 2024').should('be.visible');
    cy.get('a[href="bookings/delete/1"]').click();

    cy.get('.ant-modal-content').within(() => {
      cy.get('.ant-modal-footer button').contains('OK').click();
    });
  });
});
