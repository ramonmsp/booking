import { render, screen } from '@testing-library/react';
import { generateBooking, generatePlace } from '@/test/helpers/factories';
import { DeleteConfirmation } from './delete_confirmation';
import { Booking } from '@/app/lib/mocks/booking';

describe('components/DeleteConfirmation', () => {
  let booking: Booking;

  beforeAll(() => {
    const place = generatePlace({ location: 'Location' });
    booking = generateBooking({ place });
  });

  it('should render delete modal correctly', () => {
    render(
      <DeleteConfirmation
        open={true}
        handleOpen={() => {}}
        booking={booking}
        onCancel={() => {}}
        onOk={() => {}}
      />,
    );
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  it('should calls onCancel function', () => {
    const onCancel = jest.fn();
    render(
      <DeleteConfirmation
        open={true}
        handleOpen={() => {}}
        booking={booking}
        onCancel={onCancel}
        onOk={() => {}}
      />,
    );
    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    cancelButton.click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('should calls onOk function', () => {
    const onOk = jest.fn();
    render(
      <DeleteConfirmation
        open={true}
        handleOpen={() => {}}
        booking={booking}
        onCancel={() => {}}
        onOk={onOk}
      />,
    );
    const okButton = screen.getByRole('button', { name: /OK/ });
    okButton.click();
    expect(onOk).toHaveBeenCalled();
  });
});
