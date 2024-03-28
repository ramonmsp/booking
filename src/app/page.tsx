'use client';
import React from 'react';
import { Typography } from 'antd';
import useStyles from './use_styles';

const Home = () => {
  const styles = useStyles();

  return (
    <div style={styles.container}>
      <Typography.Title> Welcome to Booking App </Typography.Title>
    </div>
  );
};

export default Home;
