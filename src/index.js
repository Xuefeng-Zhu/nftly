import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import './index.css';
import App from './App';
import { StateContextProvider } from './contexts/StateContextProvider';
import { Web3ContextProvider } from './contexts/Web3ContextProvider';

const queryClient = new QueryClient();

const subgraphUri = 'https://api.thegraph.com/subgraphs/name/rarible/protocol';
const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Web3ContextProvider>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </Web3ContextProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
