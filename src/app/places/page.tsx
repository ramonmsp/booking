'use client';
import React from 'react';
import { Col, Row } from 'antd';
import { PlaceCard } from '../components/place_card/place_card';
import { Place } from '../lib/mocks/places';
import { getPlaces } from '../utils/requests';

const Places = async () => {
  const places = await getPlaces();

  const renderCards = (places: Place[]) =>
    places.map((place, index) => (
      <Col span={8} key={index}>
        <PlaceCard place={place} />
      </Col>
    ));

  return <Row gutter={16}>
    {renderCards(places)}
  </Row>;
};

export default Places;
