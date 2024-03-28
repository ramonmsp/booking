export const createBooking = (BASE_URL: string) => {
  return cy
    .request({
      url: `${BASE_URL}/api/bookings`,
      method: 'POST',
      body: {
				id: '1',
        property: {
          id: '1',
          name: 'Salvador',
          description: 'Salvador is a city in Brazil',
          imageUrl: 'https://source.unsplash.com/1600x900/?salvador',
        },
        start: '2024-08-16',
        end: '2024-08-20',
      },
    }).its('status').should('eq', 200);
};
