import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMap } from 'react-use';
import _ from 'lodash';

import { useWeb3Context } from './Web3ContextProvider';
import * as covalent from '../utils/covalent';
import * as opensea from '../utils/opensea';

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

    setLoading(true);

    const { collection } = await opensea.retrieveContract(address);
    if (!collections[address]) {
      collections[address] = {};
    }

    collections[address].opensea = collection;
    setCollections.set(address, collections[address]);

    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{
        retrieveMarket,
        retrieveContract,
        collections,
        loading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
