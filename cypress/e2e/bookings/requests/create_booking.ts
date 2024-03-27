export const createBooking = (BASE_URL: string) => {
  return cy
    .request({
      url: `${BASE_URL}/api/bookings`,
      method: 'POST',
      body: {
				id: '1',
        place: {
          id: '1',
          name: 'Salvador',
          description: 'Salvador is a city in Brazil',
          imageUrl: 'https://source.unsplash.com/1600x900/?salvador',
        },
        startDate: '2024-08-16',
        endDate: '2024-08-20',
      },
    }).its('status').should('eq', 200);
};
