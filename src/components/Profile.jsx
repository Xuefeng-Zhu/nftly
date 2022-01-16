import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, List } from 'antd-mobile';

import { useWeb3Context } from '../contexts/Web3ContextProvider';

const Profile = () => {
  const { loadWeb3Modal, logoutOfWeb3Modal, address } = useWeb3Context();
  const history = useHistory();

  if (!address) {
    return (
      <List mode="card">
        <List.Item onClick={loadWeb3Modal}>Connect Wallet</List.Item>
      </List>
    );
  }

  return (
    <>
      <List mode="card" header="Mint">
        <List.Item onClick={() => history.push('/mint')}>Quick Mint</List.Item>
        <List.Item
          onClick={() =>
            window.open('https://edition-drop.vercel.app', '_blank')
          }
        >
          Mint a Edition
        </List.Item>
      </List>

      <List mode="card">
        <List.Item onClick={logoutOfWeb3Modal}>Logout</List.Item>
      </List>
    </>
  );
};

export default Profile;
