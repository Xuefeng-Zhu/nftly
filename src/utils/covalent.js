import axios from 'axios';

const COVALENT_API = 'https://api.covalenthq.com/v1';

export const retrieveMarket = async ({ chainId = 1 } = {}) => {
  const options = {
    method: 'GET',
    url: `${COVALENT_API}/${chainId}/nft_market/`,
    headers: {
      'Content-Type': 'application/json',
    },
    params: { key: process.env.REACT_APP_COVALENT_KEY },
  };

  return axios.request(options).then((res) => res.data);
};
