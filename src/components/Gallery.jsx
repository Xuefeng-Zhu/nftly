import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { SpinLoading, Swiper, AutoCenter, FloatingBubble } from 'antd-mobile';
import { MessageFill } from 'antd-mobile-icons';
import { NFTPreview, NFTFullPage } from '@zoralabs/nft-components';

import { retrieveAssets } from '../utils/opensea';

const Gallery = ({ isLoading, data }) => {
  function handleIndexChange() {
    document.getElementsByClassName('body')[0].scrollTop = 0;
  }

  if (isLoading) {
    return (
      <AutoCenter>
        <SpinLoading />
      </AutoCenter>
    );
  }

  return (
    <>
      <Swiper indicator={() => null} onIndexChange={handleIndexChange}>
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
      <FloatingBubble
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
          // '--edge-distance': '24px',
        }}
      >
        <MessageFill fontSize={32} />
      </FloatingBubble>
    </>
  );
};

export default Gallery;
