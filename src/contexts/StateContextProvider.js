import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMap } from 'react-use';
import _ from 'lodash';

import { useWeb3Context } from './Web3ContextProvider';
import * as covalent from '../utils/covalent';
import * as opensea from '../utils/opensea';

const NFT_PORT_API = 'https://api.nftport.xyz/v0';
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { provider, signer } = useWeb3Context();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useMap({});

  const retrieveMarket = async (opts) => {
    setLoading(true);
    const { data } = await covalent.retrieveMarket(opts);
    setCollections.setAll(_.keyBy(data.items, 'collection_address'));
    setLoading(false);
  };

  const retrieveContract = async (address) => {
    if (collections[address]?.opensea) {
      return;
    }

    console.log(collections[address]);
    setLoading(true);

    const { collection } = await opensea.retrieveContract(address);
    if (!collections[address]) {
      collections[address] = {};
    }

    collections[address].opensea = collection;
    setCollections.set(address, collections[address]);

    setLoading(false);
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);

    const options = {
      method: 'POST',
      url: `${NFT_PORT_API}/files`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: process.env.REACT_APP_NFT_PORT_API_KEY,
        'content-type':
          'multipart/form-data; boundary=---011000010111000001101001',
      },
      data,
    };

    return axios.request(options).then(function (response) {
      return response.data;
    });
  };

  const mintNFT = async (data, address) => {
    data.date = new Date();
  };

  return (
    <StateContext.Provider
      value={{
        retrieveMarket,
        retrieveContract,
        uploadFile,
        mintNFT,
        collections,
        loading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
