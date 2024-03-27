export const deleteAllBookings = (BASE_URL: string) => {
  return cy
    .request({
      method: 'DELETE',
      url: `${BASE_URL}/api/bookings`,
    }).its('status').should('eq', 200);
};
