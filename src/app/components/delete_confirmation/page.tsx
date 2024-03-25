import { Booking } from '@/app/lib/mocks/booking';
import { Modal, Typography } from 'antd';
import React from 'react';

interface DeleteConfirmationProps {
  open: boolean;
  handleOpen: (open: boolean) => void;
  booking: Booking;
  onCancel?: () => void;
  onOk?: () => void;
}

export const DeleteConfirmation = ({
  open,
  handleOpen,
  booking,
  onCancel,
  onOk
}: DeleteConfirmationProps) => {
  const { place } = booking;
  React.useEffect(() => {
    handleOpen(true);
  }, [handleOpen]);

  return (
    <Modal title="Delete Booking" open={open} onCancel={onCancel} onOk={onOk}>
      <Typography.Text>
        Are you sure you want to delete your reservation at {' '}
        <Typography.Text strong>{place?.location}?</Typography.Text>
      </Typography.Text>
    </Modal>
  );
};
