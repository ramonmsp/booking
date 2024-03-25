import { DateRange } from '@/app/bookings/new/[placeId]/page';
import { Place } from './places';

export interface Booking {
  id?: string;
  place: Place;
  start: Date;
  end: Date;
}

export const allBookings = new Map<string, Booking>();

export function getAll() {
  return Array.from(allBookings.values());
}

export function getById(id: string) {
  return allBookings.get(id);
}

export function create(booking: Booking) {
  allBookings.set(booking.id!, booking);
}

export function editById(id: string, newDates: DateRange) {
  const booking = allBookings.get(id);

  if (!booking) {
    throw new Error('Booking not found');
  }
  const {start, end } = newDates;

  allBookings.set(id, {
    ...booking,
    start,
    end,
  });
}

export function deleteById(id: string) {
  allBookings.delete(id);
}
