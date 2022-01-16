import axios from 'axios';

const NFT_PORT_API = 'https://api.nftport.xyz/v0';

export const uploadFile = async (file) => {
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

  return axios.request(options).then(({ data }) => {
    return {
      url: data.ipfs_url,
    };
  });
};

export const easyMint = async (name, description, address, url) => {
  const options = {
    method: 'POST',
    url: `${NFT_PORT_API}/mints/easy/urls`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: process.env.REACT_APP_NFT_PORT_API_KEY,
    },
    data: {
      name,
      description,
      chain: 'polygon',
      mint_to_address: address,
      file_url: url,
    },
  };

  return axios.request(options).then((res) => res.data);
};

export const nftOwned = async (chain, address) => {
  const options = {
    method: 'GET',
    url: `${NFT_PORT_API}/accounts/${address}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_NFT_PORT_API_KEY,
    },
    params: {
      chain,
    },
  };

  return axios.request(options).then((res) => res.data);
};

export const nftDetails = async (chain, address, id) => {
  const options = {
    method: 'GET',
    url: `${NFT_PORT_API}/nfts/${address}/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_NFT_PORT_API_KEY,
    },
    params: {
      chain,
    },
  };

  return axios.request(options).then((res) => res.data);
};
