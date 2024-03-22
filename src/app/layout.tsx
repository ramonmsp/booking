'use client';
import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import useStyles from './use_styles';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const styles = useStyles();

  const itemsLabel: string[] = ['Places', 'Bookings'];

  const items = new Array(2).fill(null).map((_, index) => ({
    key: itemsLabel[index].toLocaleLowerCase(),
    label: itemsLabel[index],
    title: itemsLabel[index],
    style: styles.header.menu.option,
  }));

  const handleClick = React.useCallback(
    (item: MenuItemType) => {
      router.push(`/${item.key}`);
    },
    [router],
  );

  return (
    <html lang="en">
      <body>
        <Layout>
          <Layout.Header style={styles.header.base}>
              <Typography.Title level={4} type="secondary" style={styles.header.title}>
                Booking App
              </Typography.Title>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
                style={styles.header.menu.base}
                onClick={handleClick}
              ></Menu>
          </Layout.Header>

          <Layout.Content style={styles.content}>
            <div
              style={styles.contentInner}
            >
              {children}
            </div>
          </Layout.Content>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
