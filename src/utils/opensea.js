import axios from 'axios';

const OPEN_SEA_API = 'https://api.opensea.io/api/v1';

export const retrieveAssets = async ({
  orderBy = 'sale_date',
  offset = 0,
  limit = 50,
} = {}) => {
  const options = {
    method: 'GET',
    url: `${OPEN_SEA_API}/assets/?order_by=${orderBy}&&offset=${offset}&limit=${limit}`,
    headers: {
      'Content-Type': 'application/json',
    },
    params: { offset, limit, order_by: orderBy },
  };

  return axios.request(options).then(function (response) {
    return response.data;
  });
};
