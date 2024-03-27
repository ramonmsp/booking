import { Booking } from "@/app/lib/mocks/booking";
import { Property } from "@/app/lib/mocks/properties";

export const generateProperty = (property: Partial<Property> = {}): Property => {
  return {
    id: '1',
    location: '',
    description: 'Lorem ipsum',
    imageUrl: '',
    ...property,
  };
};

export const generateBooking = (booking: Partial<Booking> = {}): Booking => {
  return {
    id: '1',
    start: new Date(),
    end: new Date(),
    property: generateProperty(),
    ...booking,
  };
};
