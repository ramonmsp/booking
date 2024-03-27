import { render, screen } from '@testing-library/react';
import { PlaceCard } from './place_card';
import { generatePlace } from '@/test/helpers/factories';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

describe('components/PlaceCard', () => {
  it('should render cards correctly', () => {
    const place = generatePlace();
    render(<PlaceCard place={place} />);
    expect(screen.getByTestId('place-card')).toBeInTheDocument();
  });

  it('should render the correct image', () => {
    const place = generatePlace({ imageUrl: 'https://example.com/image.jpg' });
    render(<PlaceCard place={place} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', place.imageUrl);
  });

  it('should render the correct location', () => {
    const place = generatePlace({ location: 'Location' });
    render(<PlaceCard place={place} />);
    expect(screen.getByText(place.location)).toBeInTheDocument();
  });

  it('should render the correct description', () => {
    const place = generatePlace({ description: 'Description' });
    render(<PlaceCard place={place} />);
    expect(screen.getByText(place.description)).toBeInTheDocument();
  });

  it('should render button with correct label', () => {
    const place = generatePlace();
    render(<PlaceCard place={place} />);
    expect(screen.getByRole('link', { name: /Book this place/ })).toBeInTheDocument();
  });
});
