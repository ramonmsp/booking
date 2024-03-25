'use client';
import { Typography } from "antd";

const NewBookingLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Typography.Title>My Bookings</Typography.Title>
      {children}
    </>
  );
};

export default NewBookingLayout;
