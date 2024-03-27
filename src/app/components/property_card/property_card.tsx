import React from 'react';
import { Button, Card, Typography } from 'antd';
import { Property } from '@/app/lib/mocks/properties';
import useStyles from './use_styles';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
}
export const PropertyCard = ({ property }: PropertyCardProps) => {
  const styles = useStyles();

  return (
    <Card
      hoverable
      cover={<img alt="example" src={property.imageUrl} />}
      actions={[
        <div style={styles.container}>
          <Link href={`bookings/new/${property.id}`}>
            <Button type="primary" block>
              Book this property{' '}
            </Button>
          </Link>
        </div>,
      ]}
      data-testid="property-card"
    >
      <Card.Meta
        title={property.location}
        description={
          <div>
            <Typography.Text ellipsis={{ tooltip: property.description }}>
              {property.description}
            </Typography.Text>
          </div>
        }
      />
    </Card>
  );
};
