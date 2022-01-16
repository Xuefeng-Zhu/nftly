import React, { useEffect } from 'react';
import { SpinLoading, Swiper, AutoCenter } from 'antd-mobile';
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
    </>
  );
};

export default Gallery;
