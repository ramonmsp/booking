import { DateRange } from "../bookings/new/[placeId]/page";

export const isOverlapping = (target: DateRange, other: DateRange) => {
  return target.start < new Date(other.end) && target.end > new Date(other.start);
};
