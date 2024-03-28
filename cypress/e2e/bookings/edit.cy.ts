import { createBooking } from './requests/create_booking';
import { deleteAllBookings } from './requests/delete_bookings';

describe('edit booking flow', () => {
  const BASE_URL = 'http://localhost:3000';

  before(() => {
    deleteAllBookings(BASE_URL);
    createBooking(BASE_URL);
  });

  it('should edit a booking', () => {
    cy.visit(`${BASE_URL}`);
    cy.contains('Bookings').click();
    cy.contains('Bookings').click();
    cy.url().should('include', '/bookings');

    cy.get('.ant-table-row').contains('August 16, 2024').should('be.visible');
    cy.get('a[href="bookings/edit/1"]').click();

    cy.get('.ant-picker-range').click();
    cy.get('.ant-picker-panel-container').within(() => {
      cy.get('[title="2024-08-21"]').click();
      cy.get('[title="2024-08-23"]').click();
    });

    cy.contains('Update booking').click();

    cy.get('.ant-table-row').contains('July 16, 2024').should('not.exist');
    cy.get('.ant-table-row').contains('August 21, 2024').should('be.visible');
  });
});
