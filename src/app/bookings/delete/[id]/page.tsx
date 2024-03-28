'use client';
import { DeleteConfirmation } from '@/app/components/delete_confirmation/delete_confirmation';
import {
  BASE_URL,
  useDeleteBooking,
  useGetBookingById,
} from '@/app/utils/requests';
import { useRouter } from 'next/navigation';
import React from 'react';

type DeleteBookingProps = {
  params: {
    id: string;
  };
};

const DeleteBooking = ({ params }: DeleteBookingProps) => {
  const router = useRouter();
  const { id } = params;
  const { booking } = useGetBookingById(`${BASE_URL}/bookings/${id}`);
  const { trigger } = useDeleteBooking(`${BASE_URL}/bookings/${id}`);

  const handleCancel = React.useCallback(() => {
    router.push('/bookings');
  }, [router]);


  const onFinish = React.useCallback(() => {
    trigger();
    router.push('/bookings');
  }, [trigger, router]);

  return (
    <DeleteConfirmation
      booking={booking!}
      onCancel={handleCancel}
      onFinish={onFinish}
    />
  );
};

export default DeleteBooking;
