import { render, screen } from '@testing-library/react';
import { generateBooking, generateProperty } from '@/test/helpers/factories';
import BookingForm from './booking_form';
import dayjs from 'dayjs';


/* 
  since I have been facing some ant design date picker manipulation
  with Jest/RTL issues, I decided to move it verifications to flow page 
  tests.
*/ 
describe('components/BookingForm', () => {
  it('should render booking form correctly', () => {
    const property = generateProperty({
      location: 'Paris, France',
    });

    const booking = generateBooking({ property });

    render(
      <BookingForm
        property={booking}
        bookings={[]}
        onCancel={() => {}}
        onFinish={() => {}}
        open={true}
        handleOpen={() => {}}
      />,
    );
    const formModal = screen.getByTestId('form-modal');
    expect(formModal).toBeInTheDocument();
    expect(formModal).toHaveTextContent('Choose your booking dates:');
  });

  it('should render the correct property location', () => {
    const property = generateProperty({
      location: 'Paris, France',
    });
    const booking = generateBooking({ property });

    render(
      <BookingForm
        bookings={[]}
        open={true}
        handleOpen={() => {}}
        onCancel={() => {}}
        onFinish={() => {}}
        property={booking}
      />,
    );

    const formModal = screen.getByTestId('form-modal');
    expect(formModal).toHaveTextContent('Paris, France');
  });

  it('should render todays value form fields', () => {
    const property = generateProperty({
      location: 'Paris, France',
    });
    const booking = generateBooking({ property });

    render(
      <BookingForm
        property={booking}
        bookings={[]}
        onCancel={() => {}}
        onFinish={() => {}}
        open={true}
        handleOpen={() => {}}
      />,
    );

    const startDatePicker = screen.getByPlaceholderText('Start date');
    const endDatePicker = screen.getByPlaceholderText('End date');
    expect(startDatePicker).toHaveValue(dayjs().format('YYYY-MM-DD'));
    expect(endDatePicker).toHaveValue(dayjs().format('YYYY-MM-DD'));
  });
});
