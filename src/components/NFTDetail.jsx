import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  NFTFullPage,
  NFTPreview,
  MediaConfiguration,
} from '@zoralabs/nft-components';
import { Networks } from '@zoralabs/nft-hooks';

import { nftDetails } from '../utils/nftport';

const NFTDetails = () => {
  const { network, address, id } = useParams();

  return (
    <MediaConfiguration networkId={Networks[network.toUpperCase()]}>
      <NFTFullPage id={id} contract={address} />
    </MediaConfiguration>
  );
};

export default NFTDetails;
