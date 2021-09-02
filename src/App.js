import React from 'react';
import './App.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Artist from './components/Artist';
import AlbumPage from './components/AlbumPage';
import Player from './components/Player';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (<Router>

    <div className="app">
      <div className="shadow"></div>
      <Sidebar/>
      
      <Switch >
        <Route path="/artist/:id">
          <Artist/>
        </Route>
        <Route path="/album">
          <AlbumPage/>
        </Route>
      </Switch>

      <Player/>
    </div>

  </Router>);
}

export default App;
