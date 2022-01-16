import axios from 'axios';

const OPEN_SEA_API = 'https://api.opensea.io/api/v1';

export const retrieveAssets = async ({
  orderBy = 'sale_date',
  offset = 0,
  limit = 50,
  address,
} = {}) => {
  const options = {
    method: 'GET',
    url: `${OPEN_SEA_API}/assets`,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      offset,
      limit,
      order_by: orderBy,
      asset_contract_address: address,
    },
  };

  return axios.request(options).then(function (response) {
    return response.data;
  });
};

export const retrieveContract = async (address) => {
  const options = {
    method: 'GET',
    url: `${OPEN_SEA_API}/asset_contract/${address}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.request(options).then(function (response) {
    return response.data;
  });
};
