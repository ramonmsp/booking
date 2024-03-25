'use client';
import { Modal } from 'antd';
import React from 'react';
import { Button, DatePicker, Form } from 'antd';
import { Booking } from '@/app/lib/mocks/booking';
import { z } from 'zod';
import { isOverlapping } from '@/app/utils/date';
import { DateRange } from '@/app/bookings/new/[placeId]/page';
import dayjs from 'dayjs';

export type DatePickedRange = {
  bookingDates: DateRange[];
};

interface BookingFormProps {
  bookings: Booking[];
  placeToBook: Partial<Booking>;
  onCancel: () => void;
  onFinish: (values: DatePickedRange) => void;
  open: boolean;
  handleOpen: (open: boolean) => void;
  submitButtonLabel?: string;
  modalTitle?: string;
}

const schema = (bookingsDate: DateRange[]) => {
  return z.object({
    bookingDates: z.tuple([z.date(), z.date()]).refine(
      ([start, end]) => {
        const current = { start, end };
        const hasOverlaps = bookingsDate.some((other) =>
          isOverlapping(current, other),
        );
        return !hasOverlaps;
      },
      { message: 'There is an overlap with another Booking' },
    ),
  });
};

const BookingForm = ({
  placeToBook,
  bookings,
  onCancel,
  onFinish,
  open,
  handleOpen,
  submitButtonLabel = 'Create booking',
  modalTitle = 'Choose your booking dates:',
}: BookingFormProps) => {
  const { RangePicker } = DatePicker;
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const [form] = Form.useForm();
  const { place } = placeToBook;

  React.useEffect(() => {
    handleOpen(true);
  }, [handleOpen]);

  const initialValues = React.useMemo(() => {
    return {
      bookingDates: [
        dayjs(placeToBook.start),
        dayjs(placeToBook.end),
      ],
    };
  }, [placeToBook.start, placeToBook.end]);

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Modal title={modalTitle} open={open} onCancel={onCancel} footer={null}>
      <Form
        {...formItemLayout}
        form={form}
        variant="filled"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label={`Check-in and Check-out dates to ${place?.location}`}
          name="bookingDates"
          initialValue={initialValues.bookingDates}
          rules={[
            {
              validator: async (_: unknown, value: DatePickedRange) => {
                if (!value || !Array.isArray(value) || value.length === 0) {
                  return Promise.reject(
                    new Error('Please select booking dates'),
                  );
                }

                try {
                  await schema(bookings).parseAsync({
                    bookingDates: value.map((date) => new Date(date)),
                  });
                  return Promise.resolve();
                } catch (error) {
                  return Promise.reject(error as Error);
                }
              },
            },
          ]}
        >
          <RangePicker minDate={dayjs()}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { offset: 2, span: 20 },
            sm: { offset: 17, span: 20 },
          }}
        >
          <Button type="primary" htmlType="submit">
            {submitButtonLabel}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingForm;
