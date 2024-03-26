'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BookingForm, {
  DatePickedRange,
} from '@/app/components/booking_form/booking_form';
import { createBooking, getBookings, getPlaceById } from '@/app/utils/requests';
import { Booking } from '@/app/lib/mocks/booking';
import { Place } from '@/app/lib/mocks/places';
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
    placeId: string;
  };
};

const NewBooking = ({ params }: NewBookingProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { placeId } = params;

  const [placeToBook, setPlaceToBook] = React.useState<Partial<Booking>>({});
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const placeData = await getPlaceById(placeId);
        setPlaceToBook(placeData);


        const bookingsData = await getBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [placeId, setPlaceToBook, setBookings]);

  const place = {place: placeToBook as Place}

  const handleOpen = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    router.push('/bookings');
  }, [router]);

  const onFinish = (values: DatePickedRange) => {
    createBooking(values, placeId);
    setOpen(false);
    router.push('/bookings');
  };

  return (
    <BookingForm
      placeToBook={place}
      bookings={bookings ?? []}
      onCancel={handleCancel}
      onFinish={onFinish}
      open={open}
      handleOpen={handleOpen}
    />
  );
};

export default NewBooking;
