import { render } from '@testing-library/react';
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
    const { getByTestId } = render(
      <DeleteConfirmation
        open={true}
        handleOpen={() => {}}
        booking={booking}
        onCancel={() => {}}
        onOk={() => {}}
      />,
    );
    expect(getByTestId('delete-modal')).toBeInTheDocument();
  });

  it('should calls onCancel function', () => {
    const onCancel = jest.fn();
    const { getByRole } = render(
      <DeleteConfirmation
        open={true}
        handleOpen={() => {}}
        booking={booking}
        onCancel={onCancel}
        onOk={() => {}}
      />,
    );
    const cancelButton = getByRole('button', { name: /Cancel/ });
    cancelButton.click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('should calls onOk function', () => {
    const onOk = jest.fn();
    const { getByRole } = render(
      <DeleteConfirmation
        open={true}
        handleOpen={() => {}}
        booking={booking}
        onCancel={() => {}}
        onOk={onOk}
      />,
    );
    const okButton = getByRole('button', { name: /OK/ });
    okButton.click();
    expect(onOk).toHaveBeenCalled();
  });
});
