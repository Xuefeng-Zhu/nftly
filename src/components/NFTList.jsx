import React, { useEffect } from 'react';
import { AutoCenter, SpinLoading, Image, List } from 'antd-mobile';
import { MessageFill } from 'antd-mobile-icons';
import { NFTPreview, NFTFullPage } from '@zoralabs/nft-components';

const NFTList = ({ header, isLoading, nfts, onClickItem }) => {
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
    <List header={header}>
      {nfts.map((nft) => (
        <List.Item
          key={nft.file_url}
          prefix={
            <Image
              src={nft.file_url}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={40}
              height={40}
            />
          }
          description={nft.description}
          onClick={() => onClickItem(nft)}
        >
          {nft.name}
        </List.Item>
      ))}
    </List>
  );
};

export default NFTList;
