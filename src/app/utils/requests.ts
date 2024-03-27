import { DatePickedRange } from "../components/booking_form/booking_form";

const BASE_URL = 'http://localhost:3000/api';

//property
export async function getProperties() {
  const response = await fetch(`${BASE_URL}/properties`);
  return response.json();
}

export async function getPropertyById(id: string) {
    const response = await fetch(`${BASE_URL}/properties/${id}`);
    return response.json();
  }

//booking

export async function getBookings() {
  const response = await fetch(`${BASE_URL}/bookings`);
  return response.json();
}

export async function getBookingById(id: string) {
  const response = await fetch(`${BASE_URL}/bookings/${id}`);
  return response.json();
}

export async function createBooking(dates: DatePickedRange, propertyId: string) {
  const [start, end] = dates.bookingDates;
  const property = await getPropertyById(propertyId);
  const booking = {
    property,
    start,
    end,
  };

  const response = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    body: JSON.stringify(booking),
  });
  return response.json();
}

export async function editBooking(dates: DatePickedRange, id: string) {
  const [start, end] = dates.bookingDates as unknown as Date[];

  const booking = {
    start: start.toISOString(),
    end: end.toISOString(),
  };
  
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(booking),
  });
  
  if (!response.ok) {
    throw new Error('Could not update booking');
  }
  return response.json();
}

export async function deleteBooking(id: string) {
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Could not delete booking');
  }
  return response.json();
}
