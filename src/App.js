import React from 'react';
import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Artist from './components/Artist';
import Playlist from './components/Playlist';
import Album from './components/Album';
import Player from './components/Player';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

  return (<Router>

    <div className="app noselect">

      <Switch >
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route>
          <Header />
          <Sidebar/>
          <Player />
        </Route>
      </Switch>

      <Switch >
        <Route path="/artist/:id" component={Artist}/>
        <Route path="/playlists/:id" component={Playlist}/>
        <Route path="/album/:id" component={Album}/>
      </Switch>
    </div>

  </Router>);
}

export default App;