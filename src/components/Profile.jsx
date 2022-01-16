import React, { useEffect } from 'react';
import { Button } from 'antd-mobile';

import { useWeb3Context } from '../contexts/Web3ContextProvider';

const Feed = () => {
  const { loadWeb3Modal, logoutOfWeb3Modal, address } = useWeb3Context();

  if (!address) {
    return <Button onClick={loadWeb3Modal}>Connect wallet</Button>;
  }

  return (
    <>
      <Button onClick={logoutOfWeb3Modal}>Logout</Button>
    </>
  );
};

export default Feed;
