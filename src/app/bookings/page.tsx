'use client';
import { Button, Space, Table, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Booking } from '../lib/mocks/booking';
import dayjs from 'dayjs';
import { getBookings } from '../utils/requests';
import React from 'react';
import Link from 'next/link';

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const bookings = await getBookings();
        setBookings(bookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const columns: TableProps['columns'] = [
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      render: (place: Booking['place']) => place.location,
    },
    {
      title: 'Check-in',
      dataIndex: 'start',
      key: 'start',
      render: (start: Booking['start']) => dayjs(start).format('MMMM D, YYYY'),
    },
    {
      title: 'Check-out',
      dataIndex: 'end',
      key: 'end',
      render: (end: Booking['end']) => dayjs(end).format('MMMM D, YYYY'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Link href={`bookings/edit/${record.id}`}>
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </Link>
          <Link href={`bookings/delete/${record.id}`}>
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            />
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default BookingsPage;
