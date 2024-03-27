'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BookingForm, { DatePickedRange } from '@/app/components/booking_form/booking_form';
import { editBooking, getBookings } from '@/app/utils/requests';
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

  const [property, setProperty] = React.useState<
    Booking | NonNullable<unknown>
  >({});
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const bookings = await getBookings();
        const booking = bookings?.find(
          ({ bookingId }: { bookingId: string }) => bookingId === bookingId,
        );

        setProperty(booking);
        setBookings(
          bookings.filter(({ id }: { id: string }) => id !== bookingId),
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [bookingId, setProperty, setBookings]);

  const handleOpen = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    router.push('/bookings');
  }, [router]);

  const onFinish = async (values: DatePickedRange) => {
    await editBooking(values, bookingId);
    setOpen(false);
    router.push('/bookings');
  };

  return (
    <BookingForm
      property={property!}
      bookings={bookings ?? []}
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
