'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BookingForm, {
  DatePickedRange,
} from '@/app/components/booking_form/booking_form';
import {
  createBooking,
  getBookings,
  getPropertyById,
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

  const [property, setProperty] = React.useState<Partial<Booking>>({});
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getPropertyById(propertyId);
        setProperty(propertyData);

        const bookingsData = await getBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setBookings, propertyId]);

  const propertyData = { property: property } as Partial<Booking>;

  const handleOpen = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    router.push('/bookings');
  }, [router]);

  const onFinish = (values: DatePickedRange) => {
    createBooking(values, propertyId);
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
