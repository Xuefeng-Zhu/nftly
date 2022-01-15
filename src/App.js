import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './components/Home';
import Collections from './components/Collections';
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
            <Route exact path="/collections" component={Collections} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
