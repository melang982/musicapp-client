import React from 'react';
import './App.scss';
import './components/components.scss';

import Artist from './components/Artist';
import Album from './components/Album';
import Player from './components/Player';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {

  return (<Router>
    <div className="app">

      <div className="shadow"></div>
      <div className="sidebar"></div>

      <Switch>
        <Route path="/artist/:id">
          <Artist/>
        </Route>
        <Route path="/album">
          <Album/>
        </Route>
      </Switch>

      <Player/>
    </div>
  </Router>);
}

export default App;
