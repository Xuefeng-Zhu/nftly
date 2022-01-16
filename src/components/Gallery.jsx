import React, { useEffect } from 'react';
import { SpinLoading, Swiper, AutoCenter, FloatingBubble } from 'antd-mobile';
import { HeartOutline } from 'antd-mobile-icons';
import { NFTFullPage } from '@zoralabs/nft-components';

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
          '--initial-position-bottom': '50px',
          '--initial-position-right': '24px',
          // '--edge-distance': '24px',
        }}
      >
        <HeartOutline fontSize={32} />
      </FloatingBubble>
    </>
  );
};

export default Gallery;
