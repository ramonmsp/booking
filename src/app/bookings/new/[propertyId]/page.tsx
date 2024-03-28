'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BookingForm, {
  DatePickedRange,
} from '@/app/components/booking_form/booking_form';
import {
  BASE_URL,
  useGetPropertyById,
  useGetBookings,
  useCreateBooking,
} from '@/app/utils/requests';
import { Booking } from '@/app/lib/mocks/booking';
import { Dayjs } from 'dayjs';

export type DateRange = {
  start: Date | Dayjs;
  end: Date | Dayjs;
};

export type BookDate = {
  bookingDates: DateRange;
};

type NewBookingProps = {
  params: {
    propertyId: string;
  };
};

const NewBooking = ({ params }: NewBookingProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { propertyId } = params;
  const createBooking = useCreateBooking(`${BASE_URL}/bookings`);


  const { property } = useGetPropertyById(
    `${BASE_URL}/properties/${propertyId}`
  );
  const { bookings } = useGetBookings<Booking[]>(`${BASE_URL}/bookings`);

  const propertyData = { property: property } as Partial<Booking>;

  const handleOpen = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    router.push('/bookings');
  }, [router]);

  const onFinish = (values: DatePickedRange) => {
    const { bookingDates } = values;
    const [start, end] = bookingDates;

    const startDate = new Date(start.toLocaleString());
    const endDate = new Date(end.toLocaleString());

    const booking = {
      start: startDate,
      end: endDate,
      property,
    } as Partial<Booking>;

    createBooking.trigger(booking);
    setOpen(false);
    router.push('/bookings');
  };

  return (
    <BookingForm
      property={propertyData}
      bookings={bookings ?? []}
      onCancel={handleCancel}
      onFinish={onFinish}
      open={open}
      handleOpen={handleOpen}
    />
  );
};

export default NewBooking;
