import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Header from './components/Header';

import Album from './pages/Album';
import Artist from './pages/Artist';
import Login from './pages/Login';
import Main from './pages/Main';
import Playlist from './pages/Playlist';
import Signup from './pages/Signup';

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
        <Route>
          <Main/>
        </Route>
      </Switch>
    </div>

  </Router>);
}

export default App;