import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Swiper } from 'antd-mobile';
import { NFTPreview, NFTFullPage } from '@zoralabs/nft-components';

import Gallery from './Gallery';
import { retrieveAssets } from '../utils/opensea';

const CollectionAssets = () => {
  const { address } = useParams();
  const { isLoading, data } = useQuery(['CollectionAssets', address], () =>
    retrieveAssets({ address })
  );

  return <Gallery isLoading={isLoading} data={data} />;
};

export default CollectionAssets;
