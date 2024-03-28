'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BookingForm, {
  DatePickedRange,
} from '@/app/components/booking_form/booking_form';
import {
  BASE_URL,
  useEditBooking,
  useGetBookingById,
  useGetBookings,
} from '@/app/utils/requests';
import { Booking } from '@/app/lib/mocks/booking';

export type DateRange = {
  start: Date;
  end: Date;
};

export type BookDate = {
  bookingDates: DateRange;
};

type EditBookingProps = {
  params: {
    bookingId: string;
  };
};

const EditBooking = ({ params }: EditBookingProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { bookingId } = params;
  const updateBooking = useEditBooking(`${BASE_URL}/bookings/${bookingId}`);

  const { booking } = useGetBookingById(`${BASE_URL}/bookings/${bookingId}`);
  const { bookings } = useGetBookings<Booking[]>(`${BASE_URL}/bookings/`);
  const otherBookings = bookings?.filter(({ id }) => id !== bookingId);

  const handleOpen = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    router.push('/bookings');
  }, [router]);

  const onFinish = async (values: DatePickedRange) => {
    const { bookingDates } = values;
    const [start, end] = bookingDates;

    const startDate = new Date(start.toLocaleString());
    const endDate = new Date(end.toLocaleString());
    const booking = {
      start: startDate,
      end: endDate,
    } as Partial<Booking>;

    updateBooking.trigger(booking);
    setOpen(false);
    router.push('/bookings');
  };

  return (
    <BookingForm
      property={booking as Partial<Booking>}
      bookings={otherBookings ?? []}
      onCancel={handleCancel}
      onFinish={onFinish}
      open={open}
      handleOpen={handleOpen}
      modalTitle="Update your booking dates: "
      submitButtonLabel="Update booking"
    />
  );
};

export default EditBooking;
