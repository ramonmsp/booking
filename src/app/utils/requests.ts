import { DatePickedRange } from "../components/booking_form/page";

const BASE_URL = 'http://localhost:3000/api';

//place
export async function getPlaces() {
  const response = await fetch(`${BASE_URL}/places`);
  return response.json();
}

export async function getPlaceById(id: string) {
    const response = await fetch(`${BASE_URL}/places/${id}`);
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

export async function createBooking(dates: DatePickedRange, placeId: string) {
  const [start, end] = dates.bookingDates;
  const place = await getPlaceById(placeId);
  const booking = {
    place,
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
