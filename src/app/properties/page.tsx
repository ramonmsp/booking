'use client';
import React from 'react';
import { Col, Row } from 'antd';
import { PropertyCard } from '../components/property_card/property_card';
import { Property } from '../lib/mocks/properties';
import { getProperties } from '../utils/requests';

const Properties = async () => {
  const properties = await getProperties();

  const renderCards = (properties: Property[]) =>
    properties.map((properties, index) => (
      <Col span={8} key={index}>
        <PropertyCard property={properties} />
      </Col>
    ));

  return <Row gutter={16}>
    {renderCards(properties)}
  </Row>;
};

export default Properties;
