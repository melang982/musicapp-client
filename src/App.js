import React from 'react';
import './styles/app.scss';
import './styles/components.scss';

import Sidebar from './components/Sidebar';
import Artist from './components/Artist';
import Playlist from './components/Playlist';
import Album from './components/Album';
import Player from './components/Player';
import Login from './components/Login';
import Signup from './components/Signup';

import { AUTH_TOKEN } from './constants';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const authToken = localStorage.getItem(AUTH_TOKEN);

function App() {

  return (<Router>

    <div className="app noselect">

      <Sidebar/>

      { authToken ?
        <div className="user">
          Andrew Z
          <img className="avatar" src="/user.svg" alt="avatar"/>
        </div> :
        <div className="links_login">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      }

      <Switch >
        <Route path="/artist/:id" component={Artist}/>
        <Route path="/playlists/:id" component={Playlist}/>
        <Route path="/album/:id" component={Album}/>

        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>

      <Player />

    </div>

  </Router>);
}

export default App;