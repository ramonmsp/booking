'use client';
import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import useStyles from './use_styles';
import 'antd/dist/reset.css';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const styles = useStyles();

  const itemsLabel: string[] = ['Properties', 'Bookings'];

  const items = new Array(2).fill(null).map((_, index) => ({
    key: itemsLabel[index].toLocaleLowerCase(),
    label: itemsLabel[index],
    title: itemsLabel[index],
    style: styles.layout.header.menu.option,
  }));

  const handleMenuClick = React.useCallback(
    (item: MenuItemType) => {
      router.push(`/${item.key}`, { scroll: true });
    },
    [router],
  );

  const handleTitleClick = React.useCallback(() => {
    router.push(`/`);
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Layout>
          <Layout.Header style={styles.layout.header.base}>
            <Typography.Title
              level={4}
              type="secondary"
              style={styles.layout.header.title}
              onClick={handleTitleClick}
            >
              Booking App
            </Typography.Title>

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={items}
              style={styles.layout.header.menu.base}
              onClick={handleMenuClick}
            />
          </Layout.Header>

          <Layout.Content style={styles.content}>{children}</Layout.Content>
          <Layout.Footer style={styles.layout.footer}>
            Booking App - All rights reserved © 2024
          </Layout.Footer>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
