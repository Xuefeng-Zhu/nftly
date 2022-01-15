import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline, PicturesOutline } from 'antd-mobile-icons';

import { useWeb3Context } from '../contexts/Web3ContextProvider';

const tabs = [
  {
    key: '/home',
    title: 'Home',
    icon: <AppOutline />,
  },
  {
    key: '/collections',
    title: 'ollections',
    icon: <PicturesOutline />,
  },
  {
    key: '/personalCenter',
    title: 'Profile',
    icon: <UserOutline />,
  },
];

const Navbar = () => {
  // const { loadWeb3Modal, logoutOfWeb3Modal, address } = useWeb3Context();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  console.log(location);

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
