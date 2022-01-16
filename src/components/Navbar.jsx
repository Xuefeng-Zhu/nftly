import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline, CompassOutline } from 'antd-mobile-icons';

const tabs = [
  {
    key: '/home',
    title: 'Home',
    icon: <AppOutline />,
  },
  {
    key: '/discovery',
    title: 'Discovery',
    icon: <CompassOutline />,
  },
  {
    key: '/profile',
    title: 'Profile',
    icon: <UserOutline />,
  },
];

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    history.push(value);
  };

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default Navbar;
