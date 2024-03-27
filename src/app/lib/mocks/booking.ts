import { DateRange } from '@/app/bookings/new/[propertyId]/page';
import { Property } from './properties';
import { Dayjs } from 'dayjs';

export interface Booking {
  id?: string;
  property: Property;
  start: Date | Dayjs;
  end: Date | Dayjs;
}

export const allBookings = new Map<string, Booking>();

export function getAll() {
  return Array.from(allBookings.values());
}

export function getById(id: string) {
  return allBookings.get(id);
}

export function create(id: string, booking: Booking) {
  allBookings.set(id!, booking);
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
