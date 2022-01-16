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
  Popup,
} from 'antd-mobile';
import { AppstoreOutline, HistogramOutline } from 'antd-mobile-icons';
import NumberFormat from 'react-number-format';

import { useStateContext } from '../contexts/StateContextProvider';
import { useWeb3Context } from '../contexts/Web3ContextProvider';

const Collections = () => {
  const { network } = useWeb3Context();
  const history = useHistory();
  const { retrieveMarket, retrieveContract, loading, collections } =
    useStateContext();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState();

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
                <Grid.Item
                  onClick={() => {
                    setSelectedCollection(item);
                  }}
                >
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
      <Popup
        visible={!!selectedCollection}
        onMaskClick={() => {
          setSelectedCollection(null);
        }}
        bodyStyle={{ height: '70vh' }}
      >
        <List header={`${selectedCollection?.collection_name} Stats`}>
          <List.Item
            description={
              <NumberFormat
                value={selectedCollection?.market_cap_quote}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            }
          >
            Market Cap
          </List.Item>
          <List.Item
            description={
              <NumberFormat
                value={selectedCollection?.volume_quote_24h}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            }
          >
            24h Volume
          </List.Item>
          <List.Item
            description={
              <NumberFormat
                value={selectedCollection?.max_price_quote}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            }
          >
            Max Price
          </List.Item>
          <List.Item
            description={
              <NumberFormat
                value={selectedCollection?.floor_price_quote_7d}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            }
          >
            Floor Price in 7 days
          </List.Item>
          <List.Item
            description={
              <NumberFormat
                value={selectedCollection?.unique_token_ids_sold_count_alltime}
                displayType={'text'}
                thousandSeparator={true}
              />
            }
          >
            Items
          </List.Item>
          <List.Item
            description={
              <NumberFormat
                value={selectedCollection?.unique_wallet_purchase_count_alltime}
                displayType={'text'}
                thousandSeparator={true}
              />
            }
          >
            Owners
          </List.Item>
        </List>
      </Popup>
    </>
  );
};

export default Collections;
