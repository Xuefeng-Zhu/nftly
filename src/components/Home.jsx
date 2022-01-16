import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

import Gallery from './Gallery';
import { retrieveAssets } from '../utils/opensea';

const Home = () => {
  const { isLoading, data } = useQuery(['HomeFeeds'], () => retrieveAssets());

  return <Gallery isLoading={isLoading} data={data} />;
};

export default Home;
