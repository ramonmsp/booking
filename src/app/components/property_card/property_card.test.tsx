import { render, screen } from '@testing-library/react';
import { PropertyCard } from './property_card';
import { generateProperty } from '@/test/helpers/factories';

describe('components/PropertyCard', () => {
  it('should render cards correctly', () => {
    const property = generateProperty();
    render(<PropertyCard property={property} />);
    expect(screen.getByTestId('property-card')).toBeInTheDocument();
  });

  it('should render the correct image', () => {
    const property = generateProperty({ imageUrl: 'https://example.com/image.jpg' });
    render(<PropertyCard property={property} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', property.imageUrl);
  });

  it('should render the correct location', () => {
    const property = generateProperty({ location: 'Location' });
    render(<PropertyCard property={property} />);
    expect(screen.getByText(property.location)).toBeInTheDocument();
  });

  it('should render the correct description', () => {
    const property = generateProperty({ description: 'Description' });
    render(<PropertyCard property={property} />);
    expect(screen.getByText(property.description)).toBeInTheDocument();
  });

  it('should render button with correct label', () => {
    const property = generateProperty();
    render(<PropertyCard property={property} />);
    expect(screen.getByRole('link', { name: /Book this property/ })).toBeInTheDocument();
  });
});
