'use client';
import { DeleteConfirmation } from '@/app/components/delete_confirmation/page';
import { Booking } from '@/app/lib/mocks/booking';
import { deleteBooking, getBookingById } from '@/app/utils/requests';
import { useRouter } from 'next/navigation';
import React from 'react';

type DeleteBookingProps = {
  params: {
    id: string;
  };
};

const DeleteBooking = ({ params }: DeleteBookingProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [booking, setBooking] = React.useState<Booking>({} as Booking);
  const { id } = params;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await getBookingById(id!);
        setBooking(bookingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, setBooking]);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    router.push('/bookings');
  }, [router]);

  const handleOpen = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  const onOk = () => {
    deleteBooking(id);
    setOpen(false);
    router.push('/bookings');
  };
  return (
    <DeleteConfirmation
      booking={booking}
      open={open}
      handleOpen={handleOpen}
      onCancel={handleCancel}
      onOk={onOk}
    />
  );
};

export default DeleteBooking;
