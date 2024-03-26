import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { generateBooking, generatePlace } from '@/test/helpers/factories';
import BookingForm from './booking_form';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

describe('components/BookingForm', () => {
  afterEach(cleanup);

  it('should render booking form correctly', () => {
    const place = generatePlace({
      location: 'Paris, France',
    });
    const booking = generateBooking({ place });

    const { getByTestId } = render(
      <BookingForm
        placeToBook={booking}
        bookings={[]}
        onCancel={() => {}}
        onFinish={() => {}}
        open={true}
        handleOpen={() => {}}
      />,
    );
    const formModal = getByTestId('form-modal');
    expect(formModal).toBeInTheDocument();
    expect(formModal).toHaveTextContent('Choose your booking dates:');
  });

  it('should render the correct place location', () => {
    const place = generatePlace({
      location: 'Paris, France',
    });
    const booking = generateBooking({ place });

    const { getByTestId } = render(
      <BookingForm
        bookings={[]}
        open={true}
        handleOpen={() => {}}
        onCancel={() => {}}
        onFinish={() => {}}
        placeToBook={booking}
      />,
    );

    const formModal = getByTestId('form-modal');
    expect(formModal).toHaveTextContent('Paris, France');
  });

  it('should render todays value form fields', () => {
    const place = generatePlace({
      location: 'Paris, France',
    });
    const booking = generateBooking({ place });

    const { getByPlaceholderText } = render(
      <BookingForm
        placeToBook={booking}
        bookings={[]}
        onCancel={() => {}}
        onFinish={() => {}}
        open={true}
        handleOpen={() => {}}
      />,
    );

    const startDatePicker = getByPlaceholderText('Start date');
    const endDatePicker = getByPlaceholderText('End date');
    expect(startDatePicker).toHaveValue(dayjs().format('YYYY-MM-DD'));
    expect(endDatePicker).toHaveValue(dayjs().format('YYYY-MM-DD'));
  });

  it('should shows an error if it has overlaps with another booking', async () => {
    const place = generatePlace({ location: 'Rio de Janeiro, Brazil' });
    const placeToBook = generateBooking({
      place,
    });
    const bookings = [
      generateBooking({
        place,
        start: new Date(2024, 3, 1),
        end: new Date(2024, 3, 10),
      }),
    ];

    const onFinish = jest.fn();

    const { getByTestId, getByText, getAllByTestId } = render(
      <BookingForm
        placeToBook={placeToBook}
        bookings={bookings}
        onCancel={() => {}}
        onFinish={onFinish}
        open={true}
        handleOpen={() => {}}
      />,
    );

    const bookingDates = getAllByTestId('booking-dates');
    const [start, end] = bookingDates;

    act(() => {
      fireEvent.change(start, { target: { value: '2024-02-01' } });
    });

    act(() => {
      fireEvent.change(end, { target: { value: '2024-02-09' } });
    });
    fireEvent.click(getByTestId('submit-button'));

    waitFor(() => {
      expect(
        getByText(/Please select booking dates/),
      ).toBeInTheDocument();
    });

  });
});
