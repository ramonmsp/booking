import { fireEvent, render, screen } from '@testing-library/react';
import { generateBooking, generateProperty } from '@/test/helpers/factories';
import { DeleteConfirmation } from './delete_confirmation';
import { Booking } from '@/app/lib/mocks/booking';

describe('components/DeleteConfirmation', () => {
  let booking: Booking;

  beforeAll(() => {
    const property = generateProperty({ location: 'Location' });
    booking = generateBooking({ property });
  });

  it('should render delete modal correctly', () => {
    render(
      <DeleteConfirmation
        booking={booking}
        onCancel={() => {}}
        onFinish={() => {}}
      />,
    );
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  it('should calls onCancel function', () => {
    const onCancel = jest.fn();
    render(
      <DeleteConfirmation
        booking={booking}
        onCancel={onCancel}
        onFinish={() => {}}
      />,
    );
    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    cancelButton.click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('should calls onFinish function', () => {
    const onFinish = jest.fn();

    render(
      <DeleteConfirmation
        booking={booking}
        onCancel={() => {}}
        onFinish={onFinish}
      />,
    );

    fireEvent.click(screen.getByTestId('submit-button-delete'));
    expect(onFinish).toHaveBeenCalled();
  });
});
