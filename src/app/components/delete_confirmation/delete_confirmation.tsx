import { Booking } from '@/app/lib/mocks/booking';
import { Button, Flex, Modal, Typography } from 'antd';
import React from 'react';

interface DeleteConfirmationProps {
  booking: Booking;
  onCancel?: () => void;
  onFinish?: () => void;
}

export const DeleteConfirmation = ({
  booking,
  onCancel,
  onFinish,
}: DeleteConfirmationProps) => {
  const handleClick = () => {
    onFinish?.();
    onCancel?.();
  };

  const Footer = () => (
    <Flex gap="small" justify="flex-end">
      <Button onClick={onCancel}>Cancel</Button>
      <Button
        type="primary"
        onClick={handleClick}
        data-testid="submit-button-delete"
      >
        OK
      </Button>
    </Flex>
  );

  return (
    <Modal
      title="Delete Booking"
      open={booking && true}
      onCancel={onCancel}
      footer={<Footer />}
      data-testid="delete-modal"
    >
      <Typography.Text>
        Are you sure you want to delete your reservation at{' '}
        <Typography.Text strong>{booking?.property?.location}?</Typography.Text>
      </Typography.Text>
    </Modal>
  );
};
