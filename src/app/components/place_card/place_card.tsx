import React from 'react';
import { Button, Card, Typography } from 'antd';
import { Place } from '@/app/lib/mocks/places';
import useStyles from './use_styles';
import Link from 'next/link';

interface PlaceCardProps {
  place: Place;
}
export const PlaceCard = ({ place }: PlaceCardProps) => {
  const styles = useStyles();

  return (
    <Card
      hoverable
      cover={<img alt="example" src={place.imageUrl} />}
      actions={[
        <div style={styles.container}>
          <Link href={`bookings/new/${place.id}`}>
            <Button type="primary" block>
              Book this place{' '}
            </Button>
          </Link>
        </div>,
      ]}
      data-testid="place-card"
    >
      <Card.Meta
        title={place.location}
        description={
          <div>
            <Typography.Text ellipsis={{ tooltip: place.description }}>
              {place.description}
            </Typography.Text>
          </div>
        }
      />
    </Card>
  );
};
