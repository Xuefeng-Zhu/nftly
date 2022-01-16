import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './components/Home';
import Collections from './components/Collections';
import CollectionAssets from './components/CollectionAssets';
import Profile from './components/Profile';
import QuickMint from './components/QuickMint';
import Navbar from './components/Navbar';
import './app.css';

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
            <Route exact path="/discovery" component={Collections} />
            <Route
              exact
              path="/collections/:address"
              component={CollectionAssets}
            />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/mint" component={QuickMint} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
