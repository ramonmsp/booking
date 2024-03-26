import { render } from '@testing-library/react';
import { PlaceCard } from './place_card';
import { generatePlace } from '@/test/helpers/factories';

describe('components/PlaceCard', () => {
  it('should render cards correctly', () => {
    const place = generatePlace();
    const { getByTestId } = render(<PlaceCard place={place} />);
    expect(getByTestId('place-card')).toBeInTheDocument();
  });

  it('should render the correct image', () => {
    const place = generatePlace({ imageUrl: 'https://example.com/image.jpg' });
    const { getByRole } = render(<PlaceCard place={place} />);
    expect(getByRole('img')).toHaveAttribute('src', place.imageUrl);
  });

  it('should render the correct location', () => {
    const place = generatePlace({ location: 'Location' });
    const { getByText } = render(<PlaceCard place={place} />);
    expect(getByText(place.location)).toBeInTheDocument();
  });

  it('should render the correct description', () => {
    const place = generatePlace({ description: 'Description' });
    const { getByText } = render(<PlaceCard place={place} />);
    expect(getByText(place.description)).toBeInTheDocument();
  });

  it('should render button with correct label', () => {
    const place = generatePlace();
    const { getByRole } = render(<PlaceCard place={place} />);
    expect(getByRole('link', { name: /Book this place/ })).toBeInTheDocument();
  });
});
