import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, List } from 'antd-mobile';

import { useWeb3Context } from '../contexts/Web3ContextProvider';

const Profile = () => {
  const { loadWeb3Modal, address } = useWeb3Context();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  return (
    <List mode="card">
      <List.Item
        onClick={async () => {
          await loadWeb3Modal();
          history.replace(from);
        }}
      >
        Connect Wallet
      </List.Item>
    </List>
  );
};

export default Profile;
