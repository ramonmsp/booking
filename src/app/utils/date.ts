import { DateRange } from "../bookings/new/[propertyId]/page";

export const isOverlapping = (target: DateRange, other: DateRange) => {
  return target.start < new Date(other.end as Date) && target.end > new Date(other.start as Date);
};
