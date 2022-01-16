import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { AppstoreOutline, HistogramOutline } from 'antd-mobile-icons';

import { useStateContext } from '../contexts/StateContextProvider';
import { useWeb3Context } from '../contexts/Web3ContextProvider';

const Collections = () => {
  const { network } = useWeb3Context();
  const history = useHistory();
  const { retrieveMarket, retrieveContract, loading, collections } =
    useStateContext();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(async () => {
    await retrieveMarket({
      chainId: network?.chainId,
    });
  }, [network]);

  async function loadMore() {
    if (loading) {
      return;
    }

    const collectionList = Object.values(collections);
    const moreData = collectionList.slice(data.length, data.length + 10);
    for (const item of moreData) {
      retrieveContract(item.collection_address);
    }

    setData([...data, ...moreData]);
    setHasMore(collectionList.length > data.length + moreData.length);
  }

  return (
    <>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>
            <Card title={item.collection_name}>
              <Image
                src={item.opensea?.banner_image_url}
                height={200}
                fit="fill"
              />
              <Grid columns={2} gap={8}>
                <Grid.Item
                  onClick={() => {
                    history.push(`/collections/${item.collection_address}`);
                  }}
                >
                  <AutoCenter>
                    <Button fill="none">
                      <AppstoreOutline />
                      Items
                    </Button>
                  </AutoCenter>
                </Grid.Item>
                <Grid.Item>
                  <AutoCenter>
                    <Button fill="none">
                      <HistogramOutline />
                      Stats
                    </Button>
                  </AutoCenter>
                </Grid.Item>
              </Grid>
            </Card>
          </List.Item>
        ))}
      </List>
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
