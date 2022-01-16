import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Dropdown, Radio, Space } from 'antd-mobile';
import { NFTPreview, NFTFullPage } from '@zoralabs/nft-components';

import NFTList from './NFTList';
import { nftOwned } from '../utils/nftport';

const OwnTokens = () => {
  const history = useHistory();
  const { address } = useParams();
  const [chain, setChain] = useState('ethereum');
  const { isLoading, data } = useQuery(['OwnTokens', chain, address], () =>
    nftOwned(chain, address)
  );

  function handleClickItem(item) {
    history.push(`/nft/${chain}/${item.contract_address}/${item.token_id}`);
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Item key="sorter" title="Network">
          <Radio.Group value={chain} onChange={setChain}>
            <Space direction="vertical" block>
              <Radio block value="ethereum">
                Ethereum
              </Radio>
              <Radio block value="polygon">
                Polygon
              </Radio>
            </Space>
          </Radio.Group>
        </Dropdown.Item>
      </Dropdown>
      <NFTList
        isLoading={isLoading}
        nfts={data?.nfts}
        header="Owned NFT"
        onClickItem={handleClickItem}
      />
    </>
  );
};

export default OwnTokens;
