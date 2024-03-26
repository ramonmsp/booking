import { Booking } from "@/app/lib/mocks/booking";
import { Place } from "@/app/lib/mocks/places";

export const generatePlace = (place: Partial<Place> = {}): Place => {
  return {
    id: '1',
    location: '',
    description: 'Lorem ipsum',
    imageUrl: '',
    ...place,
  };
};

export const generateBooking = (booking: Partial<Booking> = {}): Booking => {
  return {
    id: '1',
    start: new Date(),
    end: new Date(),
    place: generatePlace(),
    ...booking,
  };
};
