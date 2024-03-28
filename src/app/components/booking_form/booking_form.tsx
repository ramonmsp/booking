'use client';
import { Button, DatePicker, Form, Modal } from 'antd';
import React from 'react';
import { isOverlapping } from '@/app/utils/date';
import { DateRange } from '@/app/bookings/new/[propertyId]/page';
import dayjs from 'dayjs';
import { Booking } from '@/app/lib/mocks/booking';

export type DatePickedRange = {
  bookingDates: DateRange[];
};

interface BookingFormProps {
  bookings: Booking[];
  open: boolean;
  handleOpen: (open: boolean) => void;
  submitButtonLabel?: string;
  modalTitle?: string;
  onCancel: () => void;
  onFinish: (values: DatePickedRange) => void;
  property: Partial<Booking>;
}

const BookingForm = ({
  property,
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
  React.useEffect(() => {
    handleOpen(true);
  }, [handleOpen]);

  const initialValues = React.useMemo(() => {
    return {
      bookingDates:
        property && property.start && property.end
          ? [dayjs(property.start), dayjs(property.end)]
          : [],
    };
  }, [property]);

  React.useEffect(() => {
    form?.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onCancel}
      footer={null}
      data-testid="form-modal"
      forceRender
    >
      <Form
        {...formItemLayout}
        form={form}
        variant="filled"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label={`Check-in and Check-out dates to ${property?.property?.location}`}
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

                const start = new Date(value[0]);
                const end = new Date(value[1]);

                const hasOverlaps = bookings.some((booking) => {
                  const current = { start, end };
                  return isOverlapping(current, booking);
                });

                if (hasOverlaps) {
                  return Promise.reject(
                    'Property is not available in these dates',
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <RangePicker minDate={dayjs()} getPopupContainer={trigger => trigger.parentElement!} data-testid="booking-dates" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { offset: 2, span: 20 },
            sm: { offset: 17, span: 20 },
          }}
        >
          <Button type="primary" htmlType="submit" data-testid="submit-button">
            {submitButtonLabel}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingForm;
