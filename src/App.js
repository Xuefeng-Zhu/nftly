import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Connect from './components/Connect';
import Collections from './components/Collections';
import CollectionAssets from './components/CollectionAssets';
import Profile from './components/Profile';
import MintToken from './components/MintToken';
import OwnedNFT from './components/OwnedNFT';
import NFTDetail from './components/NFTDetail';
import { useWeb3Context } from './contexts/Web3ContextProvider';

import './app.css';

function PrivateRoute({ children, ...rest }) {
  const { web3Modal } = useWeb3Context();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        web3Modal.cachedProvider ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/connect',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="nav">
          <Navbar />
        </div>

        <div className="body">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/connect" component={Connect} />
            <Route exact path="/discovery" component={Collections} />
            <Route
              exact
              path="/collections/:address"
              component={CollectionAssets}
            />
            <Route exact path="/owned/:address" component={OwnedNFT} />
            <Route
              exact
              path="/nft/:network/:address/:id"
              component={NFTDetail}
            />
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/mint">
              <MintToken />
            </PrivateRoute>
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
