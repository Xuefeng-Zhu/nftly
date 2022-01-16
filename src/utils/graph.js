import { gql } from '@apollo/client';

export const DEALS_GQL = gql(`
  query Deals {
    deals(first: 1000, orderBy: blockNumber, orderDirection: desc) {
      seller
      buyer
      sellToken
      sellTokenId
      buyToken
      sellAmount
      buyAmount
      price
      fee
      txHash
      contract
    }
  }
`);
