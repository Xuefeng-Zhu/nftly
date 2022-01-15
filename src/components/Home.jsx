import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { SpinLoading, Swiper } from 'antd-mobile';
import { NFTPreview, NFTFullPage } from '@zoralabs/nft-components';

import { retrieveAssets } from '../utils/opensea';

const Feed = () => {
  const { isLoading, data } = useQuery(['HomeFeeds'], () => retrieveAssets());
  console.log(data);

  if (isLoading) {
    return <SpinLoading />;
  }

  return (
    <Swiper indicator={() => null}>
      {data.assets.map((asset) => (
        <Swiper.Item>
          <NFTFullPage
            key={asset.id}
            id={asset.token_id}
            contract={asset.asset_contract.address}
          />
        </Swiper.Item>
      ))}
    </Swiper>
  );
};

export default Feed;
