import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  SpinLoading,
  InfiniteScroll,
  List,
  Card,
  Image,
  Grid,
  AutoCenter,
  Button,
} from 'antd-mobile';
import NumberFormat from 'react-number-format';
import { NFTPreview, PreviewComponents } from '@zoralabs/nft-components';
import { formatEther } from 'ethers/lib/utils';

import { useStateContext } from '../contexts/StateContextProvider';
import { useWeb3Context } from '../contexts/Web3ContextProvider';
import { DEALS_GQL } from '../utils/graph';

const Collections = () => {
  const { network } = useWeb3Context();
  const history = useHistory();
  const { retrieveContract, loading } = useStateContext();
  const { loading: dealsLoading, data: { deals } = {} } = useQuery(DEALS_GQL, {
    pollInterval: 0,
  });

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState();

  async function loadMore() {
    if (dealsLoading) {
      return;
    }

    const moreData = deals.slice(data.length, data.length + 10);
    setData([...data, ...moreData]);
    setHasMore(deals.length > data.length + moreData.length);
  }

  return (
    <>
      <AutoCenter>
        {data.map((item, index) => (
          <NFTPreview
            id={item.sellTokenId}
            contract={item.sellToken}
            onClick={() =>
              history.push(
                `/nft/ethereum/${item.sellToken}/${item.sellTokenId}`
              )
            }
          >
            <PreviewComponents.MediaThumbnail />
            <Card>Price: {formatEther(item.price)} ETH</Card>
          </NFTPreview>
        ))}
      </AutoCenter>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      {loading && (
        <AutoCenter>
          <SpinLoading />
        </AutoCenter>
      )}
    </>
  );
};

export default Collections;
